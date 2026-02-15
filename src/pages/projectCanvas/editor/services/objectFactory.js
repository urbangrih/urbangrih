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
                fill: "#d99d26",
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
                fill: "#a2e619",
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

export function createCorner(x, y) {
    const id = crypto.randomUUID();
    return {
        id,
        type: "corner",
        x,
        y,
        radius: 5,
        fill: "#0f0",
        draggable: true,
    }
}

export function createWall(startCornerId, endCornerId, thickness=20){
    const id = crypto.randomUUID();
    return {
        id,
        type: "wall",
        startCornerId   ,
        endCornerId,
        thickness,
        fill: "#f00",
        stroke: "#000",
        strokeWidth: 1,
    }
}
