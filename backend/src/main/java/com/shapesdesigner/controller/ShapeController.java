package com.shapesdesigner.controller;

import com.shapesdesigner.dto.ShapeRequest;
import com.shapesdesigner.dto.ShapeResponse;
import com.shapesdesigner.service.ShapeService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shapes")
public class ShapeController {

    private final ShapeService shapeService;

    public ShapeController(ShapeService shapeService) {
        this.shapeService = shapeService;
    }

    /**
     *  Create a new shape.
     */
    @PostMapping
    public ResponseEntity<ShapeResponse> createShape(@Valid @RequestBody ShapeRequest request) {
        ShapeResponse response = shapeService.createShape(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     *  Get all shapes.
     */
    @GetMapping
    public ResponseEntity<List<ShapeResponse>> getAllShapes() {
        List<ShapeResponse> shapes = shapeService.getAllShapes();
        return ResponseEntity.ok(shapes);
    }

    /**
     *  Get a shape by ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ShapeResponse> getShapeById(@PathVariable Long id) {
        ShapeResponse response = shapeService.getShapeById(id);
        return ResponseEntity.ok(response);
    }

    /**
     *  Update a shape.
     */
    @PutMapping("/{id}")
    public ResponseEntity<ShapeResponse> updateShape(
            @PathVariable Long id,
            @Valid @RequestBody ShapeRequest request) {
        ShapeResponse response = shapeService.updateShape(id, request);
        return ResponseEntity.ok(response);
    }

    /**
     *  Delete a shape.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteShape(@PathVariable Long id) {
        shapeService.deleteShape(id);
        return ResponseEntity.noContent().build();
    }
}
