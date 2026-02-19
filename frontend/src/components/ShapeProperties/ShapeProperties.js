import React from 'react';
import './ShapeProperties.css';

const ShapeProperties = ({ shape }) => {
  if (!shape) {
    return null;
  }

  const { type, dimensionData, area } = shape;

  const getPerimeter = () => {
    switch (type.toUpperCase()) {
      case 'RECTANGLE': {
        const p = 2 * (dimensionData.width + dimensionData.height);
        return Math.round(p * 100) / 100;
      }
      case 'CIRCLE': {
        const p = 2 * Math.PI * dimensionData.radius;
        return Math.round(p * 100) / 100;
      }
      case 'TRIANGLE': {
        // For an isosceles triangle approximation
        const b = dimensionData.base;
        const h = dimensionData.height;
        const side = Math.sqrt(Math.pow(b / 2, 2) + Math.pow(h, 2));
        const p = b + 2 * side;
        return Math.round(p * 100) / 100;
      }
      default:
        return 0;
    }
  };

  const getTypeLabel = () => {
    const labels = {
      RECTANGLE: 'Rectangle',
      CIRCLE: 'Circle',
      TRIANGLE: 'Triangle',
    };
    return labels[type.toUpperCase()] || type;
  };

  const getAreaFormula = () => {
    switch (type.toUpperCase()) {
      case 'RECTANGLE':
        return `${dimensionData.width} × ${dimensionData.height}`;
      case 'CIRCLE':
        return `π × ${dimensionData.radius}²`;
      case 'TRIANGLE':
        return `½ × ${dimensionData.base} × ${dimensionData.height}`;
      default:
        return '';
    }
  };

  return (
    <div className="properties-container">
      <h3 className="properties-title">Shape Properties</h3>

      <div className="properties-grid">
        <div className="property-card">
          <span className="property-label">Type</span>
          <span className="property-value type-badge" data-type={type.toUpperCase()}>
            {getTypeLabel()}
          </span>
        </div>

        <div className="property-card">
          <span className="property-label">Name</span>
          <span className="property-value">{shape.name}</span>
        </div>

        <div className="property-card highlight">
          <span className="property-label">Area</span>
          <span className="property-value large">{area}</span>
          <span className="property-formula">{getAreaFormula()}</span>
        </div>

        <div className="property-card">
          <span className="property-label">
            {type.toUpperCase() === 'CIRCLE' ? 'Circumference' : 'Perimeter'}
          </span>
          <span className="property-value">{getPerimeter()}</span>
        </div>

        {/* Dimension Details */}
        {Object.entries(dimensionData).map(([key, value]) => (
          <div className="property-card" key={key}>
            <span className="property-label">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </span>
            <span className="property-value">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShapeProperties;
