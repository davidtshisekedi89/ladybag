package com.ladybag;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final ProductRepository products;
    private final String stripeKey;
    private final String frontendUrl;
    private final ObjectMapper mapper;

    public OrderController(ProductRepository products, ObjectMapper mapper,
        @Value("${ladybag.stripe-secret-key:}") String stripeKey,
        @Value("${ladybag.frontend-url:http://localhost:3000}") String frontendUrl) {
        this.products = products;
        this.mapper = mapper;
        this.stripeKey = stripeKey;
        this.frontendUrl = frontendUrl;
    }

    public record CartLine(@NotNull Long id, @Min(1) int count) {}
    public record OrderRequest(@NotBlank String userName, @NotBlank @Email String email,
        @NotEmpty List<@Valid CartLine> products) {}

    @PostMapping
    public Map<String, String> checkout(@Valid @RequestBody OrderRequest order) throws Exception {
        if (stripeKey.isBlank()) {
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE,
                "Stripe test checkout is not configured. Set STRIPE_SECRET_KEY.");
        }
        if (!stripeKey.startsWith("sk_test_")) {
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE,
                "Only Stripe test-mode keys are supported in this demo.");
        }

        List<String> fields = new ArrayList<>();
        fields.add("mode=payment");
        fields.add("success_url=" + enc(frontendUrl + "/checkout/succes?session_id={CHECKOUT_SESSION_ID}"));
        fields.add("cancel_url=" + enc(frontendUrl + "/checkout"));
        fields.add("customer_email=" + enc(order.email()));

        for (int i = 0; i < order.products().size(); i++) {
            CartLine line = order.products().get(i);
            Product p = products.findById(line.id()).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unknown product ID: " + line.id()));
            long cents = p.getPrice().multiply(BigDecimal.valueOf(100))
                .setScale(0, RoundingMode.UNNECESSARY).longValueExact();
            if (cents <= 0) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid product price");
            String prefix = "line_items[" + i + "]";
            fields.add(enc(prefix + "[price_data][currency]") + "=usd");
            fields.add(enc(prefix + "[price_data][unit_amount]") + "=" + cents);
            fields.add(enc(prefix + "[price_data][product_data][name]") + "=" + enc(p.getName()));
            fields.add(enc(prefix + "[quantity]") + "=" + line.count());
        }

        HttpRequest request = HttpRequest.newBuilder(URI.create("https://api.stripe.com/v1/checkout/sessions"))
            .timeout(Duration.ofSeconds(15))
            .header("Authorization", "Bearer " + stripeKey)
            .header("Content-Type", "application/x-www-form-urlencoded")
            .POST(HttpRequest.BodyPublishers.ofString(String.join("&", fields)))
            .build();
        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
        if (response.statusCode() / 100 != 2) {
            throw new ResponseStatusException(HttpStatus.BAD_GATEWAY, "Stripe session creation failed");
        }
        JsonNode session = mapper.readTree(response.body());
        if (!session.hasNonNull("id")) throw new ResponseStatusException(HttpStatus.BAD_GATEWAY, "Missing Stripe session ID");
        return Map.of("id", session.get("id").asText());
    }

    private static String enc(String value) {
        return URLEncoder.encode(value, StandardCharsets.UTF_8);
    }
}
