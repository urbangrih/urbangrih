import React from 'react'
import { Layer, Line, Rect, Circle } from "react-konva";
// import { useEditorStore } from "../state/editorStore";


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

    wall: (obj, corners, draggingCorner, wallEvents) => {
        const startCornerId = obj.startCornerId;
        const endCornerId = obj.endCornerId;
        
        const startCorner = getCornerPosition(startCornerId, draggingCorner, corners);
        const endCorner = getCornerPosition(endCornerId, draggingCorner, corners);
        
        if (!startCorner || !endCorner) {
            console.warn("Could not find corners for wall", obj);
            return null;
        }

        // console.log("Rendering wall", { wall: obj,startingCorner: startCorner,endCorner: endCorner});
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
                // width={obj.thickness}
                draggable={obj.draggable}
                // lineCap="round"
                {...wallEvents}
            />
        )
    },
}

function getCornerPosition(cornerId, draggingCorner, corners) {
    const dragging = draggingCorner && draggingCorner.id === cornerId ? draggingCorner : null;
    if (dragging) {
        return { x: dragging.x, y: dragging.y };
    }
    const corner = corners.find(c => c.id === cornerId);
    return { x: corner.x, y: corner.y };
}


export default function StructureLayer({walls, corners, draggingCorner=null, cornerEvents={}, wallEvents={}, events={}, rooms=[] }) {
    // console.log("Rendering structure layer", { walls, corners });
    const wallElements = walls.map((wall) => RENDERERS.wall(wall, corners, draggingCorner, wallEvents));
    const cornerElements = corners.map((corner) => RENDERERS.corner(corner, {...cornerEvents}));

    return (
        <Layer>
            {wallElements}
            {cornerElements}
        </Layer>
    )
}
