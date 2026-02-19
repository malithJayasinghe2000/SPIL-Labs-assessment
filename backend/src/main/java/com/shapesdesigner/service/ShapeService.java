package com.shapesdesigner.service;

import com.shapesdesigner.dto.ShapeRequest;
import com.shapesdesigner.dto.ShapeResponse;
import com.shapesdesigner.exception.ShapeNotFoundException;
import com.shapesdesigner.model.Shape;
import com.shapesdesigner.repository.ShapeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;


@Service
@Transactional
public class ShapeService {

    private final ShapeRepository shapeRepository;

    public ShapeService(ShapeRepository shapeRepository) {
        this.shapeRepository = shapeRepository;
    }

    /**
     * Create a new shape.
     */
    public ShapeResponse createShape(ShapeRequest request) {
        validateShapeType(request.getType());
        validateDimensions(request.getType(), request.getDimensionData());

        Shape shape = new Shape();
        shape.setName(request.getName());
        shape.setType(request.getType().toUpperCase());
        shape.setDimensionData(request.getDimensionData());

        Shape saved = shapeRepository.save(shape);
        return mapToResponse(saved);
    }

    /**
     * Get all shapes.
     */
    @Transactional(readOnly = true)
    public List<ShapeResponse> getAllShapes() {
        return shapeRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    /**
     * Get a shape by ID.
     */
    @Transactional(readOnly = true)
    public ShapeResponse getShapeById(Long id) {
        Shape shape = shapeRepository.findById(id)
                .orElseThrow(() -> new ShapeNotFoundException(id));
        return mapToResponse(shape);
    }

    /**
     * Update an existing shape.
     */
    public ShapeResponse updateShape(Long id, ShapeRequest request) {
        Shape shape = shapeRepository.findById(id)
                .orElseThrow(() -> new ShapeNotFoundException(id));

        validateShapeType(request.getType());
        validateDimensions(request.getType(), request.getDimensionData());

        shape.setName(request.getName());
        shape.setType(request.getType().toUpperCase());
        shape.setDimensionData(request.getDimensionData());

        Shape updated = shapeRepository.save(shape);
        return mapToResponse(updated);
    }

    /**
     * Delete a shape by ID.
     */
    public void deleteShape(Long id) {
        if (!shapeRepository.existsById(id)) {
            throw new ShapeNotFoundException(id);
        }
        shapeRepository.deleteById(id);
    }

    /**
     * Validates that the shape type is one of: RECTANGLE, CIRCLE, TRIANGLE.
     */
    private void validateShapeType(String type) {
        if (type == null) {
            throw new IllegalArgumentException("Shape type cannot be null");
        }
        String upperType = type.toUpperCase();
        if (!upperType.equals("RECTANGLE") && !upperType.equals("CIRCLE") && !upperType.equals("TRIANGLE")) {
            throw new IllegalArgumentException("Invalid shape type: " + type + ". Must be RECTANGLE, CIRCLE, or TRIANGLE");
        }
    }

    /**
     * Validates that the required dimensions are present for the given shape type.
     */
    private void validateDimensions(String type, Map<String, Double> dimensions) {
        if (dimensions == null || dimensions.isEmpty()) {
            throw new IllegalArgumentException("Dimension data cannot be empty");
        }

        String upperType = type.toUpperCase();
        switch (upperType) {
            case "RECTANGLE" -> {
                requireDimension(dimensions, "width");
                requireDimension(dimensions, "height");
            }
            case "CIRCLE" -> requireDimension(dimensions, "radius");
            case "TRIANGLE" -> {
                requireDimension(dimensions, "base");
                requireDimension(dimensions, "height");
            }
        }
    }

    private void requireDimension(Map<String, Double> dimensions, String key) {
        if (!dimensions.containsKey(key) || dimensions.get(key) == null || dimensions.get(key) <= 0) {
            throw new IllegalArgumentException("Dimension '" + key + "' is required and must be positive");
        }
    }

    /**
     * Calculates the area of a shape based on its type and dimensions.
     */
    private Double calculateArea(String type, Map<String, Double> dimensions) {
        return switch (type.toUpperCase()) {
            case "RECTANGLE" -> dimensions.get("width") * dimensions.get("height");
            case "CIRCLE" -> Math.PI * Math.pow(dimensions.get("radius"), 2);
            case "TRIANGLE" -> 0.5 * dimensions.get("base") * dimensions.get("height");
            default -> 0.0;
        };
    }

    /**
     * Maps a Shape entity to a ShapeResponse DTO (includes computed area).
     */
    private ShapeResponse mapToResponse(Shape shape) {
        Double area = calculateArea(shape.getType(), shape.getDimensionData());

        // Round area to 2 decimal places
        area = Math.round(area * 100.0) / 100.0;

        return new ShapeResponse(
                shape.getId(),
                shape.getName(),
                shape.getType(),
                shape.getDimensionData(),
                area,
                shape.getCreatedAt()
        );
    }
}
