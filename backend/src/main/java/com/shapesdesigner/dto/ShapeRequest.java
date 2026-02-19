package com.shapesdesigner.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.Map;


public class ShapeRequest {

    @NotBlank(message = "Shape name is required")
    private String name;

    @NotBlank(message = "Shape type is required (RECTANGLE, CIRCLE, TRIANGLE)")
    private String type;

    @NotNull(message = "Dimension data is required")
    private Map<String, Double> dimensionData;

    //Constructors 

    public ShapeRequest() {
    }

    public ShapeRequest(String name, String type, Map<String, Double> dimensionData) {
        this.name = name;
        this.type = type;
        this.dimensionData = dimensionData;
    }

    // Getters and Setters 

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
}
