import React, { useState, useEffect, useCallback } from 'react';
import ShapeForm from './components/ShapeForm/ShapeForm';
import ShapeCanvas from './components/ShapeCanvas/ShapeCanvas';
import ShapeList from './components/ShapeList/ShapeList';
import ShapeProperties from './components/ShapeProperties/ShapeProperties';
import ShapeAPI from './api/shapeApi';
import './App.css';

function App() {
  const [shapes, setShapes] = useState([]);
  const [selectedShape, setSelectedShape] = useState(null);
  const [editingShape, setEditingShape] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  // Fetch all shapes on mount
  const fetchShapes = useCallback(async () => {
    try {
      setLoading(true);
      const response = await ShapeAPI.getAllShapes();
      setShapes(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to connect to the server. Make sure the backend is running on port 8080.');
      console.error('Error fetching shapes:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchShapes();
  }, [fetchShapes]);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSubmit = async (shapeData) => {
    try {
      if (editingShape) {
        const response = await ShapeAPI.updateShape(editingShape.id, shapeData);
        setShapes((prev) =>
          prev.map((s) => (s.id === editingShape.id ? response.data : s))
        );
        setSelectedShape(response.data);
        setEditingShape(null);
        showNotification('Shape updated successfully!');
      } else {
        const response = await ShapeAPI.createShape(shapeData);
        setShapes((prev) => [...prev, response.data]);
        setSelectedShape(response.data);
        showNotification('Shape created successfully!');
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.messages
        ? JSON.stringify(err.response.data.messages)
        : 'Operation failed. Please try again.';
      showNotification(msg, 'error');
      console.error('Error saving shape:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this shape?')) return;

    try {
      await ShapeAPI.deleteShape(id);
      setShapes((prev) => prev.filter((s) => s.id !== id));
      if (selectedShape?.id === id) setSelectedShape(null);
      if (editingShape?.id === id) setEditingShape(null);
      showNotification('Shape deleted successfully!');
    } catch (err) {
      showNotification('Failed to delete shape.', 'error');
      console.error('Error deleting shape:', err);
    }
  };

  const handleSelect = (shape) => {
    setSelectedShape(shape);
    setEditingShape(null);
  };

  const handleEdit = (shape) => {
    setEditingShape(shape);
    setSelectedShape(shape);
  };

  const handleCancelEdit = () => {
    setEditingShape(null);
  };

  return (
    <div className="app">
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">
            <span className="title-icon">📐</span>
            Shape Designer
          </h1>
          <p className="app-subtitle">Create, visualize, and manage geometric shapes</p>
        </div>
      </header>

      <main className="app-main">
        {error && (
          <div className="error-banner">
            <span>⚠️</span> {error}
            <button onClick={fetchShapes} className="retry-btn">Retry</button>
          </div>
        )}

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading shapes...</p>
          </div>
        ) : (
          <div className="app-layout">
            {/* Left Panel: Form + Shape List */}
            <div className="left-panel">
              <ShapeForm
                onSubmit={handleSubmit}
                editingShape={editingShape}
                onCancel={handleCancelEdit}
              />
              <ShapeList
                shapes={shapes}
                selectedShape={selectedShape}
                onSelect={handleSelect}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>

            <div className="right-panel">
              <ShapeCanvas shape={selectedShape} />
              <ShapeProperties shape={selectedShape} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
