import React, { useRef, useEffect } from 'react';
import './ShapeCanvas.css';

const ShapeCanvas = ({ shape }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !shape) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw grid background
    drawGrid(ctx, width, height);

    // Center of canvas
    const centerX = width / 2;
    const centerY = height / 2;

    // Scale factor to fit shapes in canvas
    const maxDim = Math.max(
      ...Object.values(shape.dimensionData).map((v) => Number(v))
    );
    const scale = Math.min(300 / maxDim, 2);

    // Shape fill and stroke styles
    ctx.fillStyle = getShapeColor(shape.type);
    ctx.strokeStyle = getShapeStroke(shape.type);
    ctx.lineWidth = 2;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;

    const type = shape.type.toUpperCase();

    if (type === 'RECTANGLE') {
      const w = shape.dimensionData.width * scale;
      const h = shape.dimensionData.height * scale;
      const x = centerX - w / 2;
      const y = centerY - h / 2;

      ctx.beginPath();
      ctx.roundRect(x, y, w, h, 4);
      ctx.fill();
      ctx.stroke();

      // Dimension labels
      ctx.shadowColor = 'transparent';
      drawDimensionLabel(ctx, `${shape.dimensionData.width}`, centerX, y - 10);
      drawDimensionLabel(ctx, `${shape.dimensionData.height}`, x - 15, centerY, true);
    } else if (type === 'CIRCLE') {
      const radius = shape.dimensionData.radius * scale;

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Radius line
      ctx.shadowColor = 'transparent';
      ctx.setLineDash([5, 5]);
      ctx.strokeStyle = '#555';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(centerX + radius, centerY);
      ctx.stroke();
      ctx.setLineDash([]);

      drawDimensionLabel(ctx, `r = ${shape.dimensionData.radius}`, centerX + radius / 2, centerY - 10);
    } else if (type === 'TRIANGLE') {
      const base = shape.dimensionData.base * scale;
      const h = shape.dimensionData.height * scale;

      const x1 = centerX;
      const y1 = centerY - h / 2;
      const x2 = centerX - base / 2;
      const y2 = centerY + h / 2;
      const x3 = centerX + base / 2;
      const y3 = centerY + h / 2;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.lineTo(x3, y3);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Dimension labels
      ctx.shadowColor = 'transparent';
      drawDimensionLabel(ctx, `${shape.dimensionData.base}`, centerX, y3 + 20);
      drawDimensionLabel(ctx, `${shape.dimensionData.height}`, x2 - 20, centerY, true);
    }
  }, [shape]);

  const drawGrid = (ctx, width, height) => {
    ctx.strokeStyle = '#f0f0f0';
    ctx.lineWidth = 0.5;
    const step = 20;
    for (let x = 0; x <= width; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y <= height; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };

  const drawDimensionLabel = (ctx, text, x, y, vertical = false) => {
    ctx.save();
    ctx.font = '12px "Segoe UI", sans-serif';
    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    if (vertical) {
      ctx.translate(x, y);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText(text, 0, 0);
    } else {
      ctx.fillText(text, x, y);
    }
    ctx.restore();
  };

  const getShapeColor = (type) => {
    const colors = {
      RECTANGLE: 'rgba(59, 130, 246, 0.3)',
      CIRCLE: 'rgba(16, 185, 129, 0.3)',
      TRIANGLE: 'rgba(245, 158, 11, 0.3)',
    };
    return colors[type.toUpperCase()] || 'rgba(107, 114, 128, 0.3)';
  };

  const getShapeStroke = (type) => {
    const strokes = {
      RECTANGLE: '#3b82f6',
      CIRCLE: '#10b981',
      TRIANGLE: '#f59e0b',
    };
    return strokes[type.toUpperCase()] || '#6b7280';
  };

  if (!shape) {
    return (
      <div className="canvas-container">
        <div className="canvas-placeholder">
          <span>Select or create a shape to preview</span>
        </div>
      </div>
    );
  }

  return (
    <div className="canvas-container">
      <h3 className="canvas-title">Shape Preview</h3>
      <canvas
        ref={canvasRef}
        width={500}
        height={400}
        className="shape-canvas"
      />
    </div>
  );
};

export default ShapeCanvas;
