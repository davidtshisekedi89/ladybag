package com.ladybag;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
public class Product {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String category;
    private BigDecimal price;
    private String shortDescription;
    @Column(length = 2000)
    private String longDescription;
    @Column(length = 1000)
    private String imageUrl;

    protected Product() {}
    public Product(String name, String category, BigDecimal price, String shortDescription, String longDescription, String imageUrl) {
        this.name = name;
        this.category = category;
        this.price = price;
        this.shortDescription = shortDescription;
        this.longDescription = longDescription;
        this.imageUrl = imageUrl;
    }
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getCategory() { return category; }
    public BigDecimal getPrice() { return price; }
    public String getShortDescription() { return shortDescription; }
    public String getLongDescription() { return longDescription; }
    public String getImageUrl() { return imageUrl; }
}
