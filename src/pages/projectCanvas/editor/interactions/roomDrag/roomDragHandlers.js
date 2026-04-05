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
    // setRoomDragSession(roomId, session);
    setRoomDragSession((prev) => ({
        ...prev,
        ...session
    }));
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

    const deltaX = room.x();
    const deltaY = room.y();

    const simulation = simulateRoomMove(
        roomDragSession.dragContext,
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
        dragConstants,
        setRoomDragSession,
        roomDragSession,
        clearSession,
    } = context;
    const room = e.target;
    const roomId = room.attrs.id;
    if (!roomId) {
        room.position({ x: 0, y: 0 });
        return;
    }
    setInvalidRoomId(null);
    const finalCornersObj = roomDragSession.dragContext.activeCornerIds.map((cornerId) => {
        const cornerObj = roomDragSession.dragContext.clonedCornersMap.has(cornerId) ? roomDragSession.dragContext.clonedCornersMap.get(cornerId) : roomDragSession.dragContext.originalCornerPosition.get(cornerId);
        console.log(cornerId, cornerObj.id, roomDragSession.dragContext.lastValidPositions, roomDragSession.dragContext.simulatedCornerPositions);
        return {
            ...cornerObj,
            x: roomDragSession.dragContext.lastValidPositions[cornerObj.id].x,
            y: roomDragSession.dragContext.lastValidPositions[cornerObj.id].y,
        };
    });

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
    moveCornersBatch(finalCornersObj);
    room.position({ x: 0, y: 0 });
    recomputeRooms(dragConstants);
    clearSession();
}
