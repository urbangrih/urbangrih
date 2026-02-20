const EPSILON = 0.01;

export function segmentIntersection(p1, p2, p3, p4) {
    const denominator =
        (p2.x - p1.x) * (p4.y - p3.y) - (p2.y - p1.y) * (p4.x - p3.x);
    if (Math.abs(denominator) < EPSILON) {
        return false; // Lines are parallel
    }
    const numeratorA =
        (p4.x - p3.x) * (p1.y - p3.y) - (p4.y - p3.y) * (p1.x - p3.x);
    const numeratorB =
        (p2.x - p1.x) * (p1.y - p3.y) - (p2.y - p1.y) * (p1.x - p3.x);
    const ua = numeratorA / denominator;
    const ub = numeratorB / denominator;
    // if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
    //     return {
    //         x: p1.x + ua * (p2.x - p1.x),
    //         y: p1.y + ua * (p2.y - p1.y)
    //     };
    // }

    return ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1;
    // return false; // No intersection within the segments
}

export function orientation(p, q, r) {
  const val =
    (q.y - p.y) * (r.x - q.x) -
    (q.x - p.x) * (r.y - q.y);

  if (Math.abs(val) < EPSILON) return 0; // collinear
  return val > 0 ? 1 : 2; // clockwise / counterclockwise
}

export function onSegment(p, q, r) {
  return (
    q.x <= Math.max(p.x, r.x) + EPSILON &&
    q.x >= Math.min(p.x, r.x) - EPSILON &&
    q.y <= Math.max(p.y, r.y) + EPSILON &&
    q.y >= Math.min(p.y, r.y) - EPSILON
  );
}


export function collinearOverlap(a1, a2, b1, b2) {
  const overlapX =
    Math.max(Math.min(a1.x, a2.x), Math.min(b1.x, b2.x)) <=
    Math.min(Math.max(a1.x, a2.x), Math.max(b1.x, b2.x)) + EPSILON;

  const overlapY =
    Math.max(Math.min(a1.y, a2.y), Math.min(b1.y, b2.y)) <=
    Math.min(Math.max(a1.y, a2.y), Math.max(b1.y, b2.y)) + EPSILON;

  return overlapX || overlapY;
}

export function boundingBoxOverlap(a1, a2, b1, b2) {
    const minAx = Math.min(a1.x, a2.x);
    const maxAx = Math.max(a1.x, a2.x);
    const minAy = Math.min(a1.y, a2.y);
    const maxAy = Math.max(a1.y, a2.y);

    const minBx = Math.min(b1.x, b2.x);
    const maxBx = Math.max(b1.x, b2.x);
    const minBy = Math.min(b1.y, b2.y);
    const maxBy = Math.max(b1.y, b2.y);

    const overlapX = Math.min(maxAx, maxBx) - Math.max(minAx, minBx);
    const overlapY = Math.min(maxAy, maxBy) - Math.max(minAy, minBy);

    return overlapX > EPSILON && overlapY > EPSILON;
}


export function isCollinear(p1, p2, p3) {
    const area =
        0.5 *
        (-p2.y * p3.x +
            p1.y * (-p2.x + p3.x) +
            p1.x * (p2.y - p3.y) +
            p2.x * p3.y);
    return Math.abs(area) < EPSILON; // Consider as collinear if area is very small
}

export function distance(p1, p2) {
    return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
}

function pointToSegmentDistance(p, a, b) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  if (Math.abs(dx) < EPSILON && Math.abs(dy) < EPSILON) {
    return distance(p, a);
  }
  const t = ((p.x - a.x) * dx + (p.y - a.y) * dy) / (dx * dx + dy * dy);
  const clamped = Math.max(0, Math.min(1, t));
  const proj = { x: a.x + clamped * dx, y: a.y + clamped * dy };
  return distance(p, proj);
}

export function minimumDistanceBetweenSegments(a, b, c, d) {
  if (segmentIntersection(a, b, c, d)) {
    return 0;
  }
  const d1 = pointToSegmentDistance(a, c, d);
  const d2 = pointToSegmentDistance(b, c, d);
  const d3 = pointToSegmentDistance(c, a, b);
  const d4 = pointToSegmentDistance(d, a, b);
  return Math.min(d1, d2, d3, d4);
}

export function pointEquals(p1, p2) {
    return distance(p1, p2) < EPSILON;
}
