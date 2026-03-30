import { useEditorStore } from "../../store/editorStore";
// import { simulateCornerMove } from "../../engine/cornerEngine/simulateCornerMove";
import { getSnappedCornerPosition } from "../../services/snapEngine";
import { recomputeRooms } from "../../engine/roomEngine/roomUtils";
import { detectOverlappingCorners } from "../../engine/cornerEngine/overlapDetection";
// import { attempt }
import {
    moveCorner,
    mergeCorners,
    cleanupWalls,
} from "../../store/editorActions";

import { useState } from "react";
import {
    handleCornerDragStart,
    handleCornerDragMove,
    handleCornerDragEnd,
} from "./cornerDragHandlers";

export function useCornerDrag() {
    const corners = useEditorStore((state) => state.corners);
    // const guides = useEditorStore((s) => s.guides);
    const setGuides = useEditorStore((s) => s.setGuides);
    const clearGuides = useEditorStore((s) => s.clearGuides);

    const [draggingCorner, setDraggingCorner] = useState(null);

    return {
        onCornerDragStart: (e) =>
            handleCornerDragStart(e, { corners, setDraggingCorner }),
        onCornerDragMove: (e) =>
            handleCornerDragMove(e, {
                corners,
                setDraggingCorner,
                setGuides,
                getSnappedCornerPosition,
            }),
        onCornerDragEnd: (e) =>
            handleCornerDragEnd(e, {
                corners,
                draggingCorner,
                setDraggingCorner,
                clearGuides,
                detectOverlappingCorners,
                attemptMoveCorners,
                moveCorner,
                mergeCorners,
                cleanupWalls,
                recomputeRooms,
            }),
    };
}
