import { Layer } from "react-konva";

import { useEditorStore } from "../../store/editorStore";
// import { useState } from "react";

import { cornerNode } from "../components/cornerNode";
import { wallEdge } from "../components/wallEdge";

import { useCornerDrag } from "../../interactions/cornerDrag/useCornerDrag";
import { useWallDrag } from "../../interactions/wallDrag/useWallDrag";

export default function StructureLayer({ corners: externalCorners, walls: externalWalls }) {
    const storeCorners = useEditorStore((state) => state.corners);
    const storeWalls = useEditorStore((state) => state.walls);

    const corners = externalCorners ?? storeCorners;
    const walls = externalWalls ?? storeWalls;


    const { onCornerDragStart, onCornerDragMove, onCornerDragEnd, draggingCorner } = useCornerDrag();
    const { onWallDragStart, onWallDragMove, onWallDragEnd } = useWallDrag();
    const wallEvents = {
        onDragStart: onWallDragStart,
        onDragMove: onWallDragMove,
        onDragEnd: onWallDragEnd,
    };
    const cornerEvents = {
        onDragStart: onCornerDragStart,
        onDragMove: onCornerDragMove,
        onDragEnd: onCornerDragEnd,
    }

    return (
        <Layer>
            {walls.map((wall) => {
                return wallEdge({wallObj: wall, corners, draggingCorner, wallEvents});
            })}
            {corners.map((corner) => {
                return cornerNode({cornerObj: corner, events: cornerEvents});
            })}
        </Layer>
    )
}
