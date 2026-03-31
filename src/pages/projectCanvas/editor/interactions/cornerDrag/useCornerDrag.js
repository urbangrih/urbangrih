import { useEditorStore } from "../../store/editorStore";
import { getSnappedCornerPosition } from "../../services/snapEngine";
import { detectOverlappingCorners } from "../../services/snapEngine";
import { useState } from "react";
import { attemptMoveCorners } from "../../engines/cornerEngine/moveCorner";
import {
    handleCornerDragStart,
    handleCornerDragMove,
    handleCornerDragEnd,
} from "./cornerDragHandlers";

export function useCornerDrag() {
    const corners = useEditorStore((state) => state.corners);
    const walls = useEditorStore((state) => state.walls);
    // const guides = useEditorStore((s) => s.guides);
    const setGuides = useEditorStore((s) => s.setGuides);
    const clearGuides = useEditorStore((s) => s.clearGuides);
    const recomputeRooms = useEditorStore((s) => s.recomputeRooms);
    const moveCorner = useEditorStore((s) => s.moveCorner);
    const mergeCorners = useEditorStore((s) => s.mergeCorners);
    const cleanupWalls = useEditorStore((s) => s.cleanupWalls);

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
                walls,
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
        draggingCorner,
    };
}
