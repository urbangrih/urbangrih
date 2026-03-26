import { Layer } from "react-konva";

import { useEditorStore } from "../../state/editorStore";
import { useState } from "react";

import { cornerNode } from "../components/cornerNode";
import { wallEdge } from "../components/wallEdge";

import { useCornerDrag } from "../../interactions/cornerDrag/useCornerDrag";
import { useWallDrag } from "../../interactions/wallDrag/useWallDrag";

export default function StructureLayer() {
    const corners = useEditorStore((state) => state.corners);
    const walls = useEditorStore((state) => state.walls);


    const { onCornerDragStart, onCornerDragMove, onCornerDragEnd } = useCornerDrag();
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
