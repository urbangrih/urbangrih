// prepareRoomDrag(roomId, state)
// cloneSharedCorners()
// cloneSharedWalls()
// buildCornerMapping()


// Returns:

// dragContext

// Example:

// {
//    dragCornerIds,
//    dragWallIds,
//    cornerMap,
//    wallMap,
//    originalIds
// }

import { getRoomCorners } from "../../services/topology/roomGraph";
import { getRoomWalls, getSharedCorners, getSharedWalls } from "./affectedRoomGeometry";

export function prepareRoomDrag(roomId, state){
    const roomCorners = getRoomCorners(roomId, state.rooms, state.corners);
    const dragCornerIds = roomCorners.map(corner => corner.id);
    const roomWalls = getRoomWalls(roomCorners, state.walls);
    const dragWallIds = roomWalls.map(wall => wall.id);
    const sharedCornerIds = getSharedCorners(roomId, new Set(dragCornerIds), state.rooms, state.corners);
    const sharedWallIds = getSharedWalls(roomId, new Set(dragCornerIds), state.rooms, state.walls);

    // const cornerMap = buildCornerMapping(dragCornerIds, sharedCornerIds);
    // const wallMap = buildWallMapping(dragWallIds, sharedWallIds);
    const cornerMap = cloneSharedCorners(dragCornerIds, sharedCornerIds, state.corners);
    const wallMap = cloneSharedWalls(dragWallIds, sharedWallIds, state.walls);

    const dragContext = {
        roomId,
        dragCornerIds,
        dragWallIds,
        cornerMap,
        wallMap,
        originalIds: {
            corners: dragCornerIds,
            walls: dragWallIds,
        }
    };

    return dragContext;
}

function cloneSharedCorners(dragCornerIds, sharedCornerIds, corners) {
    const cornerMap = new Map();
    for (const cornerId of dragCornerIds) {
        const corner = corners.find((c) => c.id === cornerId);
        if (corner) {
            cornerMap.set(cornerId, { ...corner });
        }
    }
    for (const cornerId of sharedCornerIds) {
        const corner = corners.find((c) => c.id === cornerId);
        if (corner) {
            cornerMap.set(cornerId, { ...corner });
        }
    }
    return cornerMap;
}

function cloneSharedWalls(dragWallIds, sharedWallIds, walls) {
    const wallMap = new Map();
    for (const wallId of dragWallIds) {
        const wall = walls.find((w) => w.id === wallId);
        if (wall) {
            wallMap.set(wallId, { ...wall });
        }
    }
    for (const wallId of sharedWallIds) {
        const wall = walls.find((w) => w.id === wallId);
        if (wall) {
            wallMap.set(wallId, { ...wall });
        }
    }
    return wallMap;
}

function buildCornerMapping(dragCornerIds, sharedCornerIds) {}