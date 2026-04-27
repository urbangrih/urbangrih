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
    const roomCorners = simulation.simulatedCornerPositions;
    const roomWalls = roomDragSession.dragContext.dragWallIds.map((wallId) => {
        const baseWall =
            roomDragSession.dragContext.clonedWallsMap.get(wallId) ||
            walls.find((w) => w.id === wallId);

        if (!baseWall) {
            return null;
        }

        const mappedStartCornerId =
            roomDragSession.dragContext.clonedCornersMap.get(baseWall.startCornerId)?.id ||
            baseWall.startCornerId;
        const mappedEndCornerId =
            roomDragSession.dragContext.clonedCornersMap.get(baseWall.endCornerId)?.id ||
            baseWall.endCornerId;

        if (
            mappedStartCornerId === baseWall.startCornerId &&
            mappedEndCornerId === baseWall.endCornerId
        ) {
            return baseWall;
        }

        return {
            ...baseWall,
            startCornerId: mappedStartCornerId,
            endCornerId: mappedEndCornerId,
        };
    });
    const affectedWalls = roomDragSession.dragContext.affectedWallIds
        .map((wallId) => walls.find((w) => w.id === wallId))
        .filter(Boolean);

    const tempCornerById = new Map(corners.map((corner) => [corner.id, corner]));

    Object.entries(roomCorners).forEach(([activeCornerId, simulatedCorner]) => {
        const existingCorner = tempCornerById.get(activeCornerId);
        tempCornerById.set(activeCornerId, {
            ...(existingCorner ?? { id: activeCornerId, type: "corner" }),
            x: simulatedCorner.x,
            y: simulatedCorner.y,
        });
    });

    const tempCornersWithClones = Array.from(tempCornerById.values());

    // console.log("[roomDrag][validate] begin", {
    //     roomId,
    //     movedCornerCount: Object.keys(roomCorners).length,
    //     dragWallCount: roomWalls.length,
    //     affectedWallCount: affectedWalls.filter(Boolean).length,
    //     hasSharedWalls: roomDragSession.dragContext.clonedWallsMap.size > 0,
    //     projectedClonedCornerCount: projectedClonedCorners.length,
    // });

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