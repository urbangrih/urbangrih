import { prepareRoomDrag } from "../../engines/roomEngine/prepareRoomDrag";
import { createRoomDragSession } from "../../engines/roomEngine/roomDragSession";
import { simulateRoomMove } from "../../engines/roomEngine/simulateRoomMove";

export function handleRoomDragStart(e, context) {
    const { corners, walls, rooms, setInvalidRoomId, setRoomDragSession } = context;
    const room = e.target;
    const roomId = room.attrs.id;
    if (!roomId) {
        return;
    }
    const dragContext = prepareRoomDrag(roomId, { corners, walls, rooms });
    const session = createRoomDragSession(roomId, dragContext);
    setRoomDragSession(session);
    setInvalidRoomId(null);
}
export function handleRoomDragMove(e, context) {
    const {
        rooms,
        walls,
        corners,
        validateRoomMove,
        setInvalidRoomId,
        dragConstants,
        roomDragSession,
        setRoomDragSession,
    } = context;
    const room = e.target;
    const roomId = room.attrs.id;
    if (!roomId) {
        return;
    }
    if (!roomDragSession) {
        room.position({ x: 0, y: 0 });
        return;
    }

    const deltaX = room.x();
    const deltaY = room.y();
    // Preview layers consume simulated topology, so keep Group transform neutral.
    room.position({ x: 0, y: 0 });
    const simulation = simulateRoomMove(
        roomDragSession,
        deltaX,
        deltaY,
    );

    const { success, reason } = validateRoomMove(
        roomId,
        simulation,
        rooms,
        walls,
        corners,
        dragConstants,
        roomDragSession,
    );
    setRoomDragSession((prev) => ({
        ...prev,
        simulatedCornerPositions: simulation.simulatedCornerPositions,
        lastValidPositions: success
            ? simulation.simulatedCornerPositions
            : prev.lastValidPositions,
        isValid: success,
    }));
    console.log("Room drag move validation result for room ", roomId, ":", reason);
    setInvalidRoomId(success ? null : roomId);
}
export function handleRoomDragEnd(e, context) {
    const {
        addBatchCorners,
        addBatchWalls,
        moveCornersBatch,
        recomputeRooms,
        setInvalidRoomId,
        dragConstants,
        roomDragSession,
        clearSession,
    } = context;
    const room = e.target;
    const roomId = room.attrs.id;
    if (!roomId || !roomDragSession) {
        room.position({ x: 0, y: 0 });
        return;
    }

    const { dragContext } = roomDragSession;

    setInvalidRoomId(null);
    const movedOriginalCorners = [];
    const clonedCornersToAdd = [];

    dragContext.activeToOriginalCornerId.forEach((originalCornerId, activeCornerId) => {
        const fallbackCorner = dragContext.originalCornerPosition.get(originalCornerId);
        const finalCorner = roomDragSession.lastValidPositions[originalCornerId] || fallbackCorner;

        if (!finalCorner) {
            return;
        }

        if (activeCornerId === originalCornerId) {
            movedOriginalCorners.push({
                id: originalCornerId,
                x: finalCorner.x,
                y: finalCorner.y,
            });
            return;
        }

        const clonedCorner = dragContext.clonedCornersMap.get(originalCornerId);
        clonedCornersToAdd.push({
            ...(clonedCorner ?? { id: activeCornerId, type: "corner" }),
            id: activeCornerId,
            x: finalCorner.x,
            y: finalCorner.y,
        });
    });

    const hasCornerMovement = dragContext.dragCornerIds.some((cornerId) => {
        const initialCorner = dragContext.originalCornerPosition.get(cornerId);
        const finalCorner = roomDragSession.lastValidPositions[cornerId] || initialCorner;

        if (!initialCorner || !finalCorner) {
            return false;
        }

        return (
            Math.abs(finalCorner.x - initialCorner.x) > dragConstants.EPSILON ||
            Math.abs(finalCorner.y - initialCorner.y) > dragConstants.EPSILON
        );
    });

    if (movedOriginalCorners.length > 0) {
        moveCornersBatch(movedOriginalCorners);
    }

    if (hasCornerMovement && clonedCornersToAdd.length > 0) {
        addBatchCorners(clonedCornersToAdd);
    }

    if (hasCornerMovement && dragContext.clonedWallsMap.size > 0) {
        const clonedWallsToAdd = Array.from(dragContext.clonedWallsMap.values());
        addBatchWalls(clonedWallsToAdd, dragConstants);
    }

    // const deltaX = room.x();
    // const deltaY = room.y();

    // const { success, roomCorners } = attemptRoomMove(
    //     roomId,
    //     deltaX,
    //     deltaY,
    //     rooms,
    //     walls,
    //     corners,
    //     dragConstants,
    // );

    // if (!success || !roomCorners?.length) {
    //     room.position({ x: 0, y: 0 });
    //     return;
    // }
    // room.position({ x: 0, y: 0 });


    // const updatedCorners = roomCorners.map((corner) => ({
    //     id: corner.id,
    //     x: corner.x + deltaX,
    //     y: corner.y + deltaY,
    // }));
    room.position({ x: 0, y: 0 });
    recomputeRooms(dragConstants);
    clearSession();
}
