import { orientation, onSegment } from "./intersection";

export function computeSignedArea(points) {
  if (!points || points.length < 3) {
    return 0;
  }
  let sum = 0;
  for (let i = 0; i < points.length; i += 1) {
    const current = points[i];
    const next = points[(i + 1) % points.length];
    sum += current.x * next.y - next.x * current.y;
  }
  return 0.5 * sum;
}

export function computeFaceArea(face, corners) {
    const cornerById = buildCornerMap(corners);
    const cornerIds = Array.isArray(face) ? face : face.cornerIds;
    if (!cornerIds || cornerIds.length < 3) {
        return 0;
    }

    const points = cornerIds
        .map((cornerId) => cornerById.get(cornerId))
        .filter(Boolean);

    if (points.length < 3) {
        return 0;
    }

    // return Math.abs(computeSignedArea(points));
    return computeSignedArea(points);
}

function buildCornerMap(corners) {
	const cornerById = new Map();
	for (const corner of corners || []) {
		cornerById.set(corner.id, corner);
	}
	return cornerById;
}

export function pointInPolygon(point, polygon) {
  if (!polygon || polygon.length < 3) {
    return false;
  }

  // Check if point lies on any edge
  for (let i = 0; i < polygon.length; i += 1) {
    const a = polygon[i];
    const b = polygon[(i + 1) % polygon.length];
    if (orientation(a, point, b) === 0 && onSegment(a, point, b)) {
      return true;
    }
  }

  // Ray casting algorithm
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i, i += 1) {
    const xi = polygon[i].x;
    const yi = polygon[i].y;
    const xj = polygon[j].x;
    const yj = polygon[j].y;

    const intersects =
      yi > point.y !== yj > point.y &&
      point.x < ((xj - xi) * (point.y - yi)) / (yj - yi + 0.0) + xi;

    if (intersects) {
      inside = !inside;
    }
  }

  return inside;
}