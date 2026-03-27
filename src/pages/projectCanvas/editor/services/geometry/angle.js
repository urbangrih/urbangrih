import { EPSILON } from "../geometry";

export function getAngle(fromCorner, toCorner) {
  const dx = toCorner.x - fromCorner.x;
  const dy = toCorner.y - fromCorner.y;
  if (Math.abs(dx) < EPSILON && Math.abs(dy) < EPSILON) {
    return 0;
  }
  const angle = Math.atan2(dy, dx);
  return angle < 0 ? angle + Math.PI * 2 : angle;
}