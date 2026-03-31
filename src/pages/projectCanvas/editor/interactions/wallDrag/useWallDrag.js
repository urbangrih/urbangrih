import {
    handleWallDragStart,
    handleWallDragMove,
    handleWallDragEnd,
} from "./wallDragHandlers";

import { useEditorStore } from "../../store/editorStore";
import { attemptMoveCorners } from "../../engines/cornerEngine/moveCorner";


export function useWallDrag() {
    const corners = useEditorStore((state) => state.corners);
    const walls = useEditorStore((state) => state.walls);
    const moveCornersBatch = useEditorStore((state) => state.moveCornersBatch);
    const recomputeRooms = useEditorStore((state) => state.recomputeRooms);

    return {
        onWallDragStart: (e) => {
            handleWallDragStart(e, {});
        },
        onWallDragMove: (e) => {
            handleWallDragMove(e, {});
        },
        onWallDragEnd: (e) => {
            handleWallDragEnd(e, {
                corners,
                walls,
                attemptMoveCorners,
                moveCornersBatch,
                recomputeRooms
            });
        },
    };
}
