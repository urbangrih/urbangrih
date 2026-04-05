// getRoomCorners(roomId)
// getRoomWalls(roomId)
// getSharedCorners()
// getSharedWalls()

// Keeps prepareRoomDrag small.

import { getRoomKey } from "../../services/topology/roomGraph";

export function getRoomWalls(roomCornerIds, walls) {
    // const roomCornerIds = new Set(roomCorners.map((corner) => corner.id));
    return walls.filter((wall) => {
        const isStartCornerInRoom = roomCornerIds.includes(wall.startCornerId);
        const isEndCornerInRoom = roomCornerIds.includes(wall.endCornerId);
        return isStartCornerInRoom && isEndCornerInRoom;
    });
}

export function getSharedCorners(roomId, roomCornerIds, walls, rooms) {
    const sharedCornerIds = new Set();
    const roomWalls = getRoomWalls(roomCornerIds, walls);
    const roomWallsIds = roomWalls.map(wall => wall.id);
    const affectedWallIds = getAffectedWallIds(roomWallsIds, walls);
    const affectedWalls = walls.filter((wall) => affectedWallIds.includes(wall.id));
    for (const wall of affectedWalls){
        if (roomCornerIds.includes(wall.startCornerId)) {
            sharedCornerIds.add(wall.startCornerId);
        }
        if (roomCornerIds.includes(wall.endCornerId)) {
            sharedCornerIds.add(wall.endCornerId);
        }
    }
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

export function getAffectedWallIds(dragWallIds, walls) {
    // console.log(dragWallIds);
    return walls.filter((wall) => !dragWallIds.includes(wall.id)).map((wall) => wall.id);
}