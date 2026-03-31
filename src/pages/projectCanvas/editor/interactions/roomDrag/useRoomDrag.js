import {
    handleRoomDragStart,
    handleRoomDragMove,
    handleRoomDragEnd,
} from "./roomDragHandlers";
import { useEditorStore } from "../../store/editorStore";
import { useState } from "react";

// import { validateRoomMove } from "../../services/roomDragEngine";
import { validateRoomMove } from "../../engines/roomEngine/roomValidation";
import { attemptRoomMove } from "../../engines/roomEngine/moveRoom";

import { EPSILON, ROOM_DRAG_EPSILON } from "../../utils/epsilons"

export function useRoomDrag() {
    const corners = useEditorStore((state) => state.corners);
    const walls = useEditorStore((state) => state.walls);
    const rooms = useEditorStore((state) => state.rooms);
    const moveCornersBatch = useEditorStore((state) => state.moveCornersBatch);
    const recomputeRooms = useEditorStore((state) => state.recomputeRooms);

    const [invalidRoomId, setInvalidRoomId] = useState(null);

    const dragContext = {
        EPSILON: ROOM_DRAG_EPSILON,
    }

    return {
        onRoomDragStart: (e) => {
            handleRoomDragStart(e, { setInvalidRoomId });
        },
        onRoomDragMove: (e) => {
            handleRoomDragMove(e, { rooms, walls, corners, validateRoomMove, setInvalidRoomId, dragContext });
        },
        onRoomDragEnd: (e) => {
            handleRoomDragEnd(e, { rooms, walls, corners, attemptRoomMove, moveCornersBatch, recomputeRooms, setInvalidRoomId, dragContext });
        },
        invalidRoomId
    };
}
