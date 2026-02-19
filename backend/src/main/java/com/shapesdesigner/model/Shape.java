package com.shapesdesigner.model;

import com.shapesdesigner.model.converter.DimensionDataConverter;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.Map;

/**
 * JPA Entity representing a geometric shape.
 * Uses a JSON converter for flexible dimension storage.
 */
@Entity
@Table(name = "shapes")
public class Shape {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Shape name is required")
    @Column(nullable = false)
    private String name;

    @NotBlank(message = "Shape type is required")
    @Column(nullable = false)
    private String type;

    @NotNull(message = "Dimension data is required")
    @Convert(converter = DimensionDataConverter.class)
    @Column(name = "dimension_data", columnDefinition = "JSON")
    private Map<String, Double> dimensionData;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;


    public Shape() {
    }

    public Shape(String name, String type, Map<String, Double> dimensionData) {
        this.name = name;
        this.type = type;
        this.dimensionData = dimensionData;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Map<String, Double> getDimensionData() {
        return dimensionData;
    }

    public void setDimensionData(Map<String, Double> dimensionData) {
        this.dimensionData = dimensionData;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
