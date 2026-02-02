// Renders manually created shapes
import { Line, Rect, Circle } from "react-konva";

export default function ObjectsLayer({ objects }) {
    return objects.map((obj) => {
        if (obj.type === "wall") {
            return (
                <Line
                    key={obj.id}
                    points={[obj.x1, obj.y1, obj.x2, obj.y2]}
                    stroke="black"
                    strokeWidth={obj.thickness}
                />
            );
        }

        if (obj.type === "rect") {
            return (
                <Rect
                key={obj.id}
                x={obj.x}
                y={obj.y}
                width={obj.width}
                height={obj.height}
                radius={obj.radius}
                fill={obj.fill}
                stroke={obj.stroke}
                strokeWidth={obj.strokeWidth}
                cornerRadius={obj.cornerRadius}
                draggable={obj.draggable}
                />
            );
        }

        if (obj.type === "circle") {
            return (
                <Circle
                key={obj.id}
                x={obj.x}
                y={obj.y}
                radius={obj.radius}
                fill={obj.fill}
                stroke={obj.stroke}
                strokeWidth={obj.strokeWidth}
                draggable={obj.draggable}
                />
            );
        }

        if (obj.type === "door") {
            return (
                <Rect
                    key={obj.id}
                    x={obj.x}
                    y={obj.y}
                    width={obj.width}
                    height={obj.height}
                    fill="brown"
                />
            );
        }

        return null;
    });
}
