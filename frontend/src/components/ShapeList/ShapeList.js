import React from 'react';
import './ShapeList.css';

const ShapeList = ({ shapes, selectedShape, onSelect, onEdit, onDelete }) => {
  const getTypeIcon = (type) => {
    switch (type.toUpperCase()) {
      case 'RECTANGLE': return '▬';
      case 'CIRCLE': return '●';
      case 'TRIANGLE': return '▲';
      default: return '■';
    }
  };

  const getTypeColor = (type) => {
    switch (type.toUpperCase()) {
      case 'RECTANGLE': return '#3b82f6';
      case 'CIRCLE': return '#10b981';
      case 'TRIANGLE': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  if (shapes.length === 0) {
    return (
      <div className="shape-list-container">
        <h3 className="list-title">Saved Shapes</h3>
        <div className="empty-state">
          <span className="empty-icon">📐</span>
          <p>No shapes yet. Create one to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="shape-list-container">
      <h3 className="list-title">
        Saved Shapes
        <span className="shape-count">{shapes.length}</span>
      </h3>

      <div className="shape-list">
        {shapes.map((shape) => (
          <div
            key={shape.id}
            className={`shape-item ${selectedShape?.id === shape.id ? 'selected' : ''}`}
            onClick={() => onSelect(shape)}
          >
            <div className="shape-item-left">
              <span
                className="shape-icon"
                style={{ color: getTypeColor(shape.type) }}
              >
                {getTypeIcon(shape.type)}
              </span>
              <div className="shape-info">
                <span className="shape-name">{shape.name}</span>
                <span className="shape-type">
                  {shape.type.charAt(0) + shape.type.slice(1).toLowerCase()} · Area: {shape.area}
                </span>
              </div>
            </div>

            <div className="shape-actions">
              <button
                className="action-btn edit-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(shape);
                }}
                title="Edit shape"
              >
                ✏️
              </button>
              <button
                className="action-btn delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(shape.id);
                }}
                title="Delete shape"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShapeList;
