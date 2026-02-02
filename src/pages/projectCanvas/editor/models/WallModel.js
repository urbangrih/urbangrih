export function createWall({ x1, y1, x2, y2 }) {
    return {
        id: crypto.randomUUID(),
        type: "wall",
        x1,
        y1,
        x2,
        y2,
        thickness: 20,
    };
}
