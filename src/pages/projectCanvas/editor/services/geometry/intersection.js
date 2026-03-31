import { EPSILON } from "../../utils/epsilons";

export function segmentIntersection(p1, p2, p3, p4, context) {
    const denominator =
        (p2.x - p1.x) * (p4.y - p3.y) - (p2.y - p1.y) * (p4.x - p3.x);
    if (Math.abs(denominator) < context.EPSILON) {
        return false; // Lines are parallel
    }
    const numeratorA =
        (p4.x - p3.x) * (p1.y - p3.y) - (p4.y - p3.y) * (p1.x - p3.x);
    const numeratorB =
        (p2.x - p1.x) * (p1.y - p3.y) - (p2.y - p1.y) * (p1.x - p3.x);
    const ua = numeratorA / denominator;
    const ub = numeratorB / denominator;

    return ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1;
}

export function orientation(p, q, r, context) {
  const val =
    (q.y - p.y) * (r.x - q.x) -
    (q.x - p.x) * (r.y - q.y);

  if (Math.abs(val) < context.EPSILON) return 0; // collinear
  return val > 0 ? 1 : 2; // clockwise / counterclockwise
}

export function onSegment(p, q, r, context) {
  return (
    q.x <= Math.max(p.x, r.x) + context.EPSILON &&
    q.x >= Math.min(p.x, r.x) - context.EPSILON &&
    q.y <= Math.max(p.y, r.y) + context.EPSILON &&
    q.y >= Math.min(p.y, r.y) - context.EPSILON
  );
}

export function boundingBoxOverlap(a1, a2, b1, b2, context) {
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

    return overlapX > context.EPSILON && overlapY > context.EPSILON;
}