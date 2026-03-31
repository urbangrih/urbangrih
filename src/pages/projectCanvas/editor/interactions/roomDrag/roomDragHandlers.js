export function handleRoomDragStart(e, context) {
    const { setInvalidRoomId } = context;
    const room = e.target;
    const roomId = room.attrs.id;
    if (!roomId) {
        return;
    }
    setInvalidRoomId(null);
}
export function handleRoomDragMove(e, context) {
    const { rooms, walls, corners, validateRoomMove, setInvalidRoomId, dragContext } = context;
    const room = e.target;
    const roomId = room.attrs.id;
    if (!roomId) {
        return;
    }

    const deltaX = room.x();
    const deltaY = room.y();

    const { success } = validateRoomMove(
        roomId,
        deltaX,
        deltaY,
        rooms,
        walls,
        corners,
        dragContext
    );
    // console.log("Room drag move validation result for room ", roomId, ":", success);

    setInvalidRoomId(success ? null : roomId);
}
export function handleRoomDragEnd(e, context) {
    const {
        rooms,
        walls,
        corners,
        attemptRoomMove,
        moveCornersBatch,
        recomputeRooms,
        setInvalidRoomId,
        dragContext
    } = context;
    const room = e.target;
    const roomId = room.attrs.id;
    if (!roomId) {
        room.position({ x: 0, y: 0 });
        return;
    }
    setInvalidRoomId(null);

    const deltaX = room.x();
    const deltaY = room.y();

    const { success, roomCorners } = attemptRoomMove(
        roomId,
        deltaX,
        deltaY,
        rooms,
        walls,
        corners,
        dragContext
    );

    if (!success || !roomCorners?.length) {
        room.position({ x: 0, y: 0 });
        return;
    }

    const updatedCorners = roomCorners.map((corner) => ({
        id: corner.id,
        x: corner.x + deltaX,
        y: corner.y + deltaY,
    }));
    moveCornersBatch(updatedCorners);
    room.position({ x: 0, y: 0 });
    recomputeRooms(dragContext);
}
