// getRoomCorners(roomId)
// getRoomWalls(roomId)
// getSharedCorners()
// getSharedWalls()

// Keeps prepareRoomDrag small.

import { getRoomKey } from "../../services/topology/roomGraph";

function toCornerIdSet(roomCornerIds) {
    if (roomCornerIds instanceof Set) {
        return roomCornerIds;
    }
    return new Set(roomCornerIds);
}

export function getRoomWalls(roomCornerIds, walls) {
    const roomCornerIdSet = toCornerIdSet(roomCornerIds);
    return walls.filter((wall) => {
        const isStartCornerInRoom = roomCornerIdSet.has(wall.startCornerId);
        const isEndCornerInRoom = roomCornerIdSet.has(wall.endCornerId);
        return isStartCornerInRoom && isEndCornerInRoom;
    });
}

export function getSharedCorners(roomId, roomCornerIds, walls, rooms) {
    const roomCornerIdSet = toCornerIdSet(roomCornerIds);
    const sharedCornerIds = new Set();
    const roomWalls = getRoomWalls(roomCornerIds, walls);
    const roomWallsIds = roomWalls.map(wall => wall.id);
    const affectedWallIds = getAffectedWallIds(roomWallsIds, walls);
    const affectedWalls = walls.filter((wall) => affectedWallIds.includes(wall.id));
    for (const wall of affectedWalls){
        if (roomCornerIdSet.has(wall.startCornerId)) {
            sharedCornerIds.add(wall.startCornerId);
        }
        if (roomCornerIdSet.has(wall.endCornerId)) {
            sharedCornerIds.add(wall.endCornerId);
        }
    }
    for (const room of rooms) {
        if (getRoomKey(room) === roomId) continue;
        for (const cornerId of room.cornerIds) {
            if (roomCornerIdSet.has(cornerId)) {
                sharedCornerIds.add(cornerId);
            }
        }
    }
    return Array.from(sharedCornerIds);
}

export function getSharedWalls(roomId, roomCornerIds, rooms, walls) {
    const roomCornerIdSet = toCornerIdSet(roomCornerIds);
    const sharedWallIds = new Set();
    for (const room of rooms) {
        if (getRoomKey(room) === roomId) continue;
        const otherRoomCornerIds = new Set(room.cornerIds);

        // A wall is truly shared only when both of its endpoints belong to both rooms.
        for (const wall of walls) {
            const inCurrentRoom =
                roomCornerIdSet.has(wall.startCornerId) &&
                roomCornerIdSet.has(wall.endCornerId);
            const inOtherRoom =
                otherRoomCornerIds.has(wall.startCornerId) &&
                otherRoomCornerIds.has(wall.endCornerId);

            if (
                inCurrentRoom &&
                inOtherRoom
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