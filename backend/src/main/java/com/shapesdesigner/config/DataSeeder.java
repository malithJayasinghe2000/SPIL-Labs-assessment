package com.shapesdesigner.config;

import com.shapesdesigner.model.Shape;
import com.shapesdesigner.repository.ShapeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Map;


@Component
public class DataSeeder implements CommandLineRunner {

    private final ShapeRepository shapeRepository;

    public DataSeeder(ShapeRepository shapeRepository) {
        this.shapeRepository = shapeRepository;
    }

    @Override
    public void run(String... args) {
        if (shapeRepository.count() == 0) {
            // Default Rectangle 
            Shape rectangle = new Shape(
                    "Default Rectangle",
                    "RECTANGLE",
                    Map.of("width", 100.0, "height", 100.0)
            );

            // Default Circl
            Shape circle = new Shape(
                    "Default Circle",
                    "CIRCLE",
                    Map.of("radius", 50.0)
            );

            // Default Triangle 
            Shape triangle = new Shape(
                    "Default Triangle",
                    "TRIANGLE",
                    Map.of("base", 100.0, "height", 80.0)
            );

            shapeRepository.save(rectangle);
            shapeRepository.save(circle);
            shapeRepository.save(triangle);

            System.out.println("✓ Default shapes seeded successfully.");
        } else {
            System.out.println("✓ Shapes already exist, skipping seed.");
        }
    }
}
