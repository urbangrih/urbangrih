import { EPSILON } from "../../utils/epsilons";

export function getAngle(fromCorner, toCorner, context) {
  const dx = toCorner.x - fromCorner.x;
  const dy = toCorner.y - fromCorner.y;
  if (Math.abs(dx) < context.EPSILON && Math.abs(dy) < context.EPSILON) {
    return 0;
  }
  const angle = Math.atan2(dy, dx);
  return angle < 0 ? angle + Math.PI * 2 : angle;
}