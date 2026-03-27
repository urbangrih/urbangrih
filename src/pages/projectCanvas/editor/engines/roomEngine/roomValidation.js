export function validateRoomMove(
    roomId,
    deltaX,
    deltaY,
    rooms,
    walls,
    corners,
) {
    const roomCorners = getRoomCorners(roomId, rooms, corners);
    if (roomCorners.length === 0) {
        return { success: false, reason: "missing-room", tempCorners: corners };
    }

    const roomCornerIds = new Set(roomCorners.map((corner) => corner.id));
    const tempCorners = corners.map((corner) => {
        if (roomCornerIds.has(corner.id)) {
            return {
                ...corner,
                x: corner.x + deltaX,
                y: corner.y + deltaY,
            };
        }
        return corner;
    });

    const affectedWalls = walls.filter(
        (wall) =>
            roomCornerIds.has(wall.startCornerId) ||
            roomCornerIds.has(wall.endCornerId),
    );

    let isDragValid = false;
    let isOverlapping = false;
    for (const wall of affectedWalls) {
        isDragValid = isPlacementValid(
            wall,
            walls.filter((w) => w.id !== wall.id),
            tempCorners,
        );
        if (!isDragValid) {
            isOverlapping = isWallOverlapping(
                wall,
                walls.filter((w) => w.id !== wall.id),
                tempCorners,
            );
            break;
        }
    }

    if (isDragValid && !isOverlapping) {
        return {
            success: true,
            reason: null,
            tempCorners,
            roomCorners,
        };
    }

    return {
        success: false,
        reason: isOverlapping ? "overlap" : "invalid",
        tempCorners,
        roomCorners,
    };
}