// services/objectFactory.js
export function createObject({ type, x, y }) {
    const id = crypto.randomUUID();

    switch (type) {
        case "wall":
            return {
                id,
                type: "wall",
                x1: x,
                y1: y,
                x2: x + 120,
                y2: y,
                thickness: 20,
            };

        case "rect":
            return {
                id,
                type: "rect",
                x,
                y,
                width: 120,
                height: 80,
                fill: "transparent",
                stroke: "#000",
                strokeWidth: 2,
                cornerRadius: 0,
                draggable: true,
            }

        case "circle":
            return {
                id,
                type: "circle",
                x,
                y,
                radius: 40,
                fill: "transparent",
                stroke: "#000",
                strokeWidth: 2,
                draggable: true,
            }

        case "door":
            return {
                id,
                type: "door",
                x,
                y,
                width: 80,
                height: 10,
            };

        default:
            return null;
    }
}
