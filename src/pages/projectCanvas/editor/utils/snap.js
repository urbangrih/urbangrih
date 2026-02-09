export function snapToGrid(value, gridSize) {
  return Math.round(value / gridSize) * gridSize;
}

export function snapPointToGrid({ x, y }, gridSize) {
  return {
    x: snapToGrid(x, gridSize),
    y: snapToGrid(y, gridSize),
  };
}
