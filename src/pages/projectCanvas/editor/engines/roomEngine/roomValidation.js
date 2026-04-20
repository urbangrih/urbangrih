import { getRoomCorners } from "../../services/topology/roomGraph";
import { isPlacementValid } from "../wallEngine/wallValidationEngine";
import { isWallOverlapping } from "../wallEngine/wallTopolgyUpdate";

export function validateRoomMove(
    roomId,
    simulation,
    rooms,
    walls,
    corners,
    dragConstants,
    roomDragSession
) {
    // const roomCorners = getRoomCorners(roomId, rooms, corners);
    // if (roomCorners.length === 0) {
    //     return { success: false, reason: "missing-room", tempCorners: corners };
    // }

    // const roomCornerIds = new Set(roomCorners.map((corner) => corner.id));
    // const tempCorners = corners.map((corner) => {
    //     if (roomCornerIds.has(corner.id)) {
    //         return {
    //             ...corner,
    //             x: corner.x + deltaX,
    //             y: corner.y + deltaY,
    //         };
    //     }
    //     return corner;
    // });

    // const affectedWalls = walls.filter(
    //     (wall) =>
    //         roomCornerIds.has(wall.startCornerId) ||
    //         roomCornerIds.has(wall.endCornerId),
    // );

    const roomCorners = simulation.simulatedCornerPositions;
    const roomWalls = roomDragSession.dragContext.dragWallIds.map((wallId) => {
        if (roomDragSession.dragContext.clonedWallsMap.has(wallId)) {
            return roomDragSession.dragContext.clonedWallsMap.get(wallId);
        }
        return walls.find((w) => w.id === wallId);
    });
    const affectedWalls = roomDragSession.dragContext.affectedWallIds.map((wallId) => walls.find((w) => w.id === wallId));

    const tempCorners = corners.map((corner) => {
        if (Object.hasOwn(roomCorners, corner.id)) {
            const simulatedCorner = roomCorners[corner.id];
            return {
                ...corner,
                x: simulatedCorner.x,
                y: simulatedCorner.y,
            };
        }
        return corner;
    });

    const projectedClonedCorners = [];
    roomDragSession.dragContext.activeToOriginalCornerId.forEach((originalId, activeId) => {
        if (activeId === originalId) {
            return;
        }

        const simulatedCorner = roomCorners[originalId];
        const originalCorner =
            simulatedCorner ||
            corners.find((corner) => corner.id === originalId) ||
            roomDragSession.dragContext.originalCornerPosition.get(originalId);

        if (!originalCorner) {
            console.warn("[roomDrag][validate] missing original corner for cloned corner projection", {
                roomId,
                activeCornerId: activeId,
                originalId,
            });
            return;
        }

        projectedClonedCorners.push({
            ...originalCorner,
            id: activeId,
        });
    });

    const tempCornersWithClones = [...tempCorners, ...projectedClonedCorners];

    console.log("[roomDrag][validate] begin", {
        roomId,
        movedCornerCount: Object.keys(roomCorners).length,
        dragWallCount: roomWalls.length,
        affectedWallCount: affectedWalls.filter(Boolean).length,
        hasSharedWalls: roomDragSession.dragContext.clonedWallsMap.size > 0,
        projectedClonedCornerCount: projectedClonedCorners.length,
    });

    let isDragValid = false;
    let isOverlapping = false;
    let invalidReason = null;
    for (const wall of roomWalls) {
        if (!wall) {
            invalidReason = "missing-wall";
            console.warn("[roomDrag][validate] wall lookup failed during validation", {
                roomId,
            });
            break;
        }

        const startCorner = tempCornersWithClones.find((corner) => corner.id === wall.startCornerId);
        const endCorner = tempCornersWithClones.find((corner) => corner.id === wall.endCornerId);
        if (!startCorner || !endCorner) {
            invalidReason = "missing-wall-corners";
            console.warn("[roomDrag][validate] wall endpoints not resolvable in tempCorners", {
                roomId,
                wallId: wall.id,
                wallStartCornerId: wall.startCornerId,
                wallEndCornerId: wall.endCornerId,
                hasStartCorner: Boolean(startCorner),
                hasEndCorner: Boolean(endCorner),
                tempCornerIdsSample: tempCornersWithClones.slice(0, 12).map((corner) => corner.id),
            });
            break;
        }

        isDragValid = isPlacementValid(
            wall,
            affectedWalls,
            tempCornersWithClones,
            dragConstants
        );
        if (!isDragValid) {
            isOverlapping = isWallOverlapping(
                wall,
                affectedWalls,
                tempCornersWithClones,
                dragConstants
            );
            invalidReason = isOverlapping ? "overlap" : "invalid";
            console.log("[roomDrag][validate] failed", {
                roomId,
                wallId: wall.id,
                reason: invalidReason,
            });
            break;
        }
    }

    if (isDragValid && !isOverlapping) {
        return {
            success: true,
            reason: null,
            // tempCorners,
            // roomCorners,
        };
    }

    return {
        success: false,
        reason: isOverlapping ? "overlap" : (invalidReason ?? "invalid"),
        // tempCorners,
        // roomCorners,
    };
}