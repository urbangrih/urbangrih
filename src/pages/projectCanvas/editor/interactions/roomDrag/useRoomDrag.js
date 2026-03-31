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

export function useRoomDrag() {
    const corners = useEditorStore((state) => state.corners);
    const walls = useEditorStore((state) => state.walls);
    const rooms = useEditorStore((state) => state.rooms);
    const moveCornersBatch = useEditorStore((state) => state.moveCornersBatch);
    const recomputeRooms = useEditorStore((state) => state.recomputeRooms);

    const [invalidRoomId, setInvalidRoomId] = useState(null);

    return {
        onRoomDragStart: (e) => {
            handleRoomDragStart(e, { setInvalidRoomId });
        },
        onRoomDragMove: (e) => {
            handleRoomDragMove(e, { rooms, walls, corners, validateRoomMove, setInvalidRoomId});
        },
        onRoomDragEnd: (e) => {
            handleRoomDragEnd(e, { rooms, walls, corners, attemptRoomMove, moveCornersBatch, recomputeRooms, setInvalidRoomId });
        },
        invalidRoomId
    };
}
