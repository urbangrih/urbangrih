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
    })

    let isDragValid = false;
    let isOverlapping = false;
    for (const wall of roomWalls) {
        isDragValid = isPlacementValid(
            wall,
            affectedWalls,
            tempCorners,
            dragConstants
        );
        if (!isDragValid) {
            isOverlapping = isWallOverlapping(
                wall,
                affectedWalls,
                tempCorners,
                dragConstants
            );
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
        reason: isOverlapping ? "overlap" : "invalid",
        // tempCorners,
        // roomCorners,
    };
}