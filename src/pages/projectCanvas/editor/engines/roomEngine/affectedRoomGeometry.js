// getRoomCorners(roomId)
// getRoomWalls(roomId)
// getSharedCorners()
// getSharedWalls()

// Keeps prepareRoomDrag small.

import { getRoomKey } from "../../services/topology/roomGraph";

export function getRoomWalls(roomCorners, walls) {
    const roomCornerIds = new Set(roomCorners.map((corner) => corner.id));
    return walls.filter((wall) => roomCornerIds.has(wall.startCornerId) || roomCornerIds.has(wall.endCornerId));
}

export function getSharedCorners(roomId, roomCornerIds, rooms, corners) {
    const sharedCornerIds = new Set();
    for (const room of rooms) {
        if (getRoomKey(room) === roomId) continue;
        for (const cornerId of room.cornerIds) {
            if (roomCornerIds.has(cornerId)) {
                sharedCornerIds.add(cornerId);
            }
        }
    }
    return Array.from(sharedCornerIds);
}

export function getSharedWalls(roomId, roomCornerIds, rooms, walls) {
    const sharedWallIds = new Set();
    for (const room of rooms) {
        if (getRoomKey(room) === roomId) continue;
        const otherRoomCornerIds = new Set(room.cornerIds);
        for (const wall of walls) {
            if (
                (roomCornerIds.has(wall.startCornerId) &&
                    otherRoomCornerIds.has(wall.endCornerId)) ||
                (roomCornerIds.has(wall.endCornerId) &&
                    otherRoomCornerIds.has(wall.startCornerId))
            ) {
                sharedWallIds.add(wall.id);
            }
        }
    }
    return Array.from(sharedWallIds);
}