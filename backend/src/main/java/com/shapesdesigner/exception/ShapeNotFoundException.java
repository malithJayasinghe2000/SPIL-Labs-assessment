package com.shapesdesigner.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ShapeNotFoundException extends RuntimeException {

    public ShapeNotFoundException(Long id) {
        super("Shape not found with id: " + id);
    }
}
