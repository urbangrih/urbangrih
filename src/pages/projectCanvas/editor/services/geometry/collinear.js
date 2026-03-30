import { EPSILON } from "../../utils/epsilons";

export function collinearOverlap(a1, a2, b1, b2) {
  const overlapX =
    Math.max(Math.min(a1.x, a2.x), Math.min(b1.x, b2.x)) <=
    Math.min(Math.max(a1.x, a2.x), Math.max(b1.x, b2.x)) + EPSILON;

  const overlapY =
    Math.max(Math.min(a1.y, a2.y), Math.min(b1.y, b2.y)) <=
    Math.min(Math.max(a1.y, a2.y), Math.max(b1.y, b2.y)) + EPSILON;

  // return overlapX || overlapY;
  return overlapX && overlapY;
}

export function isCollinear(p1, p2, p3) {
    const twiceArea = Math.abs(
        p1.x * (p2.y - p3.y) +
        p2.x * (p3.y - p1.y) +
        p3.x * (p1.y - p2.y)
    );

    const base = Math.hypot(p2.x - p1.x, p2.y - p1.y);

    const height = twiceArea / base;
    // console.log("Collinearity check", height < EPSILON, { height, twiceArea, base });
    return height < EPSILON;
}