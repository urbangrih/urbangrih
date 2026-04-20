import {
    handleRoomDragStart,
    handleRoomDragMove,
    handleRoomDragEnd,
} from "./roomDragHandlers";
import { useEditorStore } from "../../store/editorStore";
import { useState } from "react";

// import { validateRoomMove } from "../../services/roomDragEngine";
import { validateRoomMove } from "../../engines/roomEngine/roomValidation";

import { ROOM_DRAG_EPSILON } from "../../utils/epsilons";

export function useRoomDrag() {
    const corners = useEditorStore((state) => state.corners);
    const walls = useEditorStore((state) => state.walls);
    const rooms = useEditorStore((state) => state.rooms);
    const addBatchCorners = useEditorStore((state) => state.addBatchCorners);
    const addBatchWalls = useEditorStore((state) => state.addBatchWalls);
    const moveCornersBatch = useEditorStore((state) => state.moveCornersBatch);
    const recomputeRooms = useEditorStore((state) => state.recomputeRooms);

    const [invalidRoomId, setInvalidRoomId] = useState(null);
    const [roomDragSession, setRoomDragSession] = useState(null);

    const dragConstants = {
        EPSILON: ROOM_DRAG_EPSILON,
    };

    const clearSession = () => {
        setRoomDragSession(null);
        setInvalidRoomId(null);
    };

    return {
        onRoomDragStart: (e) => {
            handleRoomDragStart(e, {
                corners,
                walls,
                rooms,
                setInvalidRoomId,
                setRoomDragSession,
            });
        },
        onRoomDragMove: (e) => {
            handleRoomDragMove(e, {
                rooms,
                walls,
                corners,
                validateRoomMove,
                setInvalidRoomId,
                dragConstants,
                roomDragSession,
                setRoomDragSession,
            });
        },
        onRoomDragEnd: (e) => {
            handleRoomDragEnd(e, {
                addBatchCorners,
                addBatchWalls,
                moveCornersBatch,
                recomputeRooms,
                setInvalidRoomId,
                dragConstants,
                roomDragSession,
                clearSession,
            });
        },
        invalidRoomId,
        roomDragSession,
    };
}
