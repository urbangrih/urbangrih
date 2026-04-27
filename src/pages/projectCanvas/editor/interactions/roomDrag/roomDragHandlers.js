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
    const pointer = room.getStage()?.getPointerPosition();
    if (pointer) {
        session.startPointer = {
            x: pointer.x,
            y: pointer.y,
        };
        session.currentPointer = {
            x: pointer.x,
            y: pointer.y,
        };
    }
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

    const pointer = room.getStage()?.getPointerPosition();
    let deltaX = room.x();
    let deltaY = room.y();

    if (pointer && roomDragSession.startPointer) {
        deltaX = pointer.x - roomDragSession.startPointer.x;
        deltaY = pointer.y - roomDragSession.startPointer.y;
    }

    // Preview layers consume simulated topology, so keep Group transform neutral.
    room.position({ x: 0, y: 0 });
    const simulation = simulateRoomMove(
        roomDragSession,
        deltaX,
        deltaY,
    );

    const { success } = validateRoomMove(
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
        currentPointer: pointer
            ? {
                x: pointer.x,
                y: pointer.y,
            }
            : prev.currentPointer,
        simulatedCornerPositions: simulation.simulatedCornerPositions,
        lastValidPositions: success
            ? simulation.simulatedCornerPositions
            : prev.lastValidPositions,
        isValid: success,
    }));
    // console.log("Room drag move validation result for room ", roomId, ":", reason);
    setInvalidRoomId(success ? null : roomId);
}
export function handleRoomDragEnd(e, context) {
    const {
        walls,
        addBatchCorners,
        addBatchWalls,
        replaceWalls,
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
        const finalCorner = roomDragSession.lastValidPositions[activeCornerId] || fallbackCorner;

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

    const movedOriginalWalls = walls.filter((wall) => dragContext.dragWallIds.includes(wall.id) && dragContext.activeWallIds.includes(wall.id));
    const clonedWallsToAdd = [];

    const movedOriginalWallsWithUpdatedCorners = movedOriginalWalls.map((wall) => {
        let wallStartCornerId = wall.startCornerId;
        let wallEndCornerId = wall.endCornerId;
        if (dragContext.clonedCornersMap.has(wall.startCornerId)) {
            wallStartCornerId = dragContext.clonedCornersMap.get(wall.startCornerId)?.id || wall.startCornerId;
        }
        if (dragContext.clonedCornersMap.has(wall.endCornerId)) {
            wallEndCornerId = dragContext.clonedCornersMap.get(wall.endCornerId)?.id || wall.endCornerId;
        }
        if (wallStartCornerId === wall.startCornerId && wallEndCornerId === wall.endCornerId) {
            return wall;
        }
        console.log("[roomDrag][handleRoomDragEnd] Moving original wall with updated corner references", {
            wallId: wall.id,
            originalStartCornerId: wall.startCornerId,
            originalEndCornerId: wall.endCornerId,
            updatedStartCornerId: wallStartCornerId,
            updatedEndCornerId: wallEndCornerId,
        });
        return {
            ...wall,
            startCornerId: wallStartCornerId,
            endCornerId: wallEndCornerId,
        };
    });
    dragContext.activeWallIds.forEach((wallId) => {
        if (dragContext.clonedWallsMap.has(wallId)) {
            const clonedWall = dragContext.clonedWallsMap.get(wallId);
            clonedWallsToAdd.push({
                ...clonedWall,
                startCornerId: clonedWall.startCornerId,
                endCornerId: clonedWall.endCornerId,
            });
        }
        else{
            const wall = walls.find((w) => w.id === wallId);
            if (!wall) {
                return;
            }
            clonedWallsToAdd.push(wall);
        }
    })


    const hasCornerMovement = dragContext.activeCornerIds.some((activeCornerId) => {
        const originalCornerId = dragContext.activeToOriginalCornerId.get(activeCornerId) ?? activeCornerId;
        const initialCorner = dragContext.originalCornerPosition.get(originalCornerId);
        const finalCorner = roomDragSession.lastValidPositions[activeCornerId] || initialCorner;

        
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

    if (hasCornerMovement) {
        replaceWalls(movedOriginalWallsWithUpdatedCorners);
    }

    console.log("[roomDrag][handleRoomDragEnd] Adding cloned walls for shared wall drag", {
        roomId,
        walls,
        affectedWalls: walls.filter((wall) => dragContext.affectedWallIds.includes(wall.id)),
        originalRoomCorners: dragContext.dragCornerIds,
        newRoomCorners: dragContext.activeCornerIds,
        newCornersAdded: clonedCornersToAdd,
        newWallsAdded: clonedWallsToAdd,
        hasSharedWalls: dragContext.clonedWallsMap.size > 0,
        wallAffectedByClonedCorners: movedOriginalWallsWithUpdatedCorners,
        clonedWallsToAdd
    });
    if (hasCornerMovement && dragContext.clonedWallsMap.size > 0) {
        const clonedWallsToAdd = Array.from(dragContext.clonedWallsMap.values());
        addBatchWalls(clonedWallsToAdd, dragConstants);
    }

    room.position({ x: 0, y: 0 });
    recomputeRooms(dragConstants);
    clearSession();
}
