import { EPSILON } from "../../utils/epsilons";
import { segmentIntersection } from "./intersection";

export function distance(p1, p2) {
    return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
}

function pointToSegmentDistance(p, a, b, context) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  if (Math.abs(dx) < context.EPSILON && Math.abs(dy) < context.EPSILON) {
    return distance(p, a);
  }
  const t = ((p.x - a.x) * dx + (p.y - a.y) * dy) / (dx * dx + dy * dy);
  const clamped = Math.max(0, Math.min(1, t));
  const proj = { x: a.x + clamped * dx, y: a.y + clamped * dy };
  return distance(p, proj);
}

export function minimumDistanceBetweenSegments(a, b, c, d, context) {
  if (segmentIntersection(a, b, c, d, context)) {
    return 0;
  }
  const d1 = pointToSegmentDistance(a, c, d, context);
  const d2 = pointToSegmentDistance(b, c, d, context);
  const d3 = pointToSegmentDistance(c, a, b, context);
  const d4 = pointToSegmentDistance(d, a, b, context);
  return Math.min(d1, d2, d3, d4);
}

