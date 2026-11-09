package com.ladybag;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/items")
public class CatalogController {
    private final ProductRepository products;
    public CatalogController(ProductRepository products) { this.products = products; }

    public record ImageFormat(String url) {}
    public record ImageFormats(ImageFormat medium) {}
    public record ImageAttributes(ImageFormats formats) {}
    public record ImageData(ImageAttributes attributes) {}
    public record Image(ImageData data) {}
    public record Attributes(String name, String category, BigDecimal price, String shortDescription, String longDescription, Image image) {}
    public record Item(Long id, Attributes attributes) {}

    private Item map(Product p) {
        return new Item(p.getId(), new Attributes(p.getName(), p.getCategory(), p.getPrice(),
            p.getShortDescription(), p.getLongDescription(),
            new Image(new ImageData(new ImageAttributes(new ImageFormats(new ImageFormat(p.getImageUrl())))))));
    }

    @GetMapping
    public Map<String, List<Item>> all() {
        return Map.of("data", products.findAll().stream().map(this::map).toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Item>> one(@PathVariable Long id) {
        return products.findById(id).map(p -> ResponseEntity.ok(Map.of("data", map(p))))
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @Bean
    CommandLineRunner seedProducts(ProductRepository repository) {
        return args -> {
            if (repository.count() != 0) return;
            String base = "https://raw.githubusercontent.com/davidtshisekedi89/ladybag/main/src/assets/";
            repository.saveAll(List.of(
                new Product("Classic Shoulder Bag", "bestSellers", new BigDecimal("89.00"), "Everyday shoulder bag", "A classic bag for everyday use.", base + "klb1845_10.jpg"),
                new Product("Modern Crossbody", "newArrivals", new BigDecimal("109.00"), "Compact crossbody bag", "Compact and versatile crossbody design.", base + "klb2110-r.jpg"),
                new Product("Elegant Tote", "topRated", new BigDecimal("129.00"), "Spacious tote bag", "A roomy tote for work and weekends.", base + "klb2578-r.jpg"),
                new Product("Mini Handbag", "newArrivals", new BigDecimal("69.00"), "Small statement handbag", "Lightweight mini handbag for daily essentials.", base + "klb2599-i.jpg")
            ));
        };
    }
}
