package com.shapesdesigner.dto;

import java.time.LocalDateTime;
import java.util.Map;

public class ShapeResponse {

    private Long id;
    private String name;
    private String type;
    private Map<String, Double> dimensionData;
    private Double area;
    private LocalDateTime createdAt;


    public ShapeResponse() {
    }

    public ShapeResponse(Long id, String name, String type,
                         Map<String, Double> dimensionData, Double area,
                         LocalDateTime createdAt) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.dimensionData = dimensionData;
        this.area = area;
        this.createdAt = createdAt;
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

    public Double getArea() {
        return area;
    }

    public void setArea(Double area) {
        this.area = area;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
