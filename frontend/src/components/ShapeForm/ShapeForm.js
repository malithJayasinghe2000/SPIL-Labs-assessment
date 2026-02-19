import React, { useState, useEffect } from 'react';
import './ShapeForm.css';

const ShapeForm = ({ onSubmit, editingShape, onCancel }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('RECTANGLE');
  const [dimensions, setDimensions] = useState({ width: 100, height: 100 });
  const [errors, setErrors] = useState({});

  // Populate form when editing
  useEffect(() => {
    if (editingShape) {
      setName(editingShape.name);
      setType(editingShape.type);
      setDimensions({ ...editingShape.dimensionData });
    } else {
      resetForm();
    }
  }, [editingShape]);

  const resetForm = () => {
    setName('');
    setType('RECTANGLE');
    setDimensions({ width: 100, height: 100 });
    setErrors({});
  };

  // Update dimension fields when shape type changes
  const handleTypeChange = (newType) => {
    setType(newType);
    switch (newType) {
      case 'RECTANGLE':
        setDimensions({ width: 100, height: 100 });
        break;
      case 'CIRCLE':
        setDimensions({ radius: 50 });
        break;
      case 'TRIANGLE':
        setDimensions({ base: 100, height: 80 });
        break;
      default:
        setDimensions({});
    }
  };

  const handleDimensionChange = (key, value) => {
    const numValue = parseFloat(value);
    setDimensions((prev) => ({ ...prev, [key]: isNaN(numValue) ? '' : numValue }));
    if (errors[key]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[key];
        return copy;
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';

    Object.entries(dimensions).forEach(([key, val]) => {
      if (val === '' || val === undefined || val <= 0) {
        newErrors[key] = `${key} must be a positive number`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      name: name.trim(),
      type,
      dimensionData: dimensions,
    });

    if (!editingShape) {
      resetForm();
    }
  };

  const getDimensionFields = () => {
    switch (type) {
      case 'RECTANGLE':
        return [
          { key: 'width', label: 'Width', placeholder: 'e.g. 100' },
          { key: 'height', label: 'Height', placeholder: 'e.g. 100' },
        ];
      case 'CIRCLE':
        return [
          { key: 'radius', label: 'Radius', placeholder: 'e.g. 50' },
        ];
      case 'TRIANGLE':
        return [
          { key: 'base', label: 'Base', placeholder: 'e.g. 100' },
          { key: 'height', label: 'Height', placeholder: 'e.g. 80' },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="shape-form-container">
      <h3 className="form-title">
        {editingShape ? 'Edit Shape' : 'Create New Shape'}
      </h3>

      <form onSubmit={handleSubmit} className="shape-form">
        <div className="form-group">
          <label htmlFor="shapeName">Shape Name</label>
          <input
            id="shapeName"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
            }}
            placeholder="Enter shape name"
            className={errors.name ? 'input-error' : ''}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Shape Type</label>
          <div className="type-selector">
            {['RECTANGLE', 'CIRCLE', 'TRIANGLE'].map((t) => (
              <button
                key={t}
                type="button"
                className={`type-btn ${type === t ? 'active' : ''} type-${t.toLowerCase()}`}
                onClick={() => handleTypeChange(t)}
              >
                <span className="type-icon">{getTypeIcon(t)}</span>
                {t.charAt(0) + t.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Dimensions</label>
          <div className="dimension-fields">
            {getDimensionFields().map(({ key, label, placeholder }) => (
              <div key={key} className="dimension-field">
                <label htmlFor={key}>{label}</label>
                <input
                  id={key}
                  type="number"
                  min="1"
                  step="any"
                  value={dimensions[key] ?? ''}
                  onChange={(e) => handleDimensionChange(key, e.target.value)}
                  placeholder={placeholder}
                  className={errors[key] ? 'input-error' : ''}
                />
                {errors[key] && <span className="error-text">{errors[key]}</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingShape ? 'Update Shape' : 'Create Shape'}
          </button>
          {editingShape && (
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

const getTypeIcon = (type) => {
  switch (type) {
    case 'RECTANGLE': return '▬';
    case 'CIRCLE': return '●';
    case 'TRIANGLE': return '▲';
    default: return '■';
  }
};

export default ShapeForm;
