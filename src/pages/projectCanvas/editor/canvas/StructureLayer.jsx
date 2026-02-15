import React from 'react'
import { Line, Rect, Circle } from "react-konva";
import { useEditorStore } from "../state/editorStore";


const RENDERERS = {
    corner: (obj, events) => (
        <Circle
            // ref={setNodeRef}
            key={obj.id}
            name="object"
            id={obj.id}
            dataType={obj.type}
            x={obj.x}
            y={obj.y}
            radius={obj.radius}
            fill={obj.fill}
            draggable={obj.draggable}
            {...events}
        />
    ),

    wall: (obj, events) => {
        const corners = useEditorStore((s) => s.corners);
        // const walls
        const startCornerId = obj.startCornerId;
        const endCornerId = obj.endCornerId;

        const startCorner = corners.find(c => c.id === startCornerId);
        const endCorner = corners.find(c => c.id === endCornerId);

        if (!startCorner || !endCorner) {
            console.warn("Could not find corners for wall", obj);
            return null;
        }
        return (
            <Line
                // ref={setNodeRef}
                key={obj.id}
                id={obj.id}
                name="object"
                dataType={obj.type}
                points={[startCorner.x, startCorner.y, endCorner.x, endCorner.y]}
                fill={obj.fill ?? "red"}
                stroke={obj.stroke ?? "black"}
                strokeWidth={obj.thickness ?? 20}
                draggable={obj.draggable}
                // lineCap="round"
                {...events}
            />
        )
    },
}


export default function StructureLayer({walls, corners, cornerEvents={}, events={} }) {
    console.log("Rendering structure layer", { walls, corners });
    const wallElements = walls.map((wall) => RENDERERS.wall(wall, events));
    const cornerElements = corners.map((corner) => RENDERERS.corner(corner, cornerEvents))
    return (
        <>
            {wallElements}
            {cornerElements}
        </>
    )
}
