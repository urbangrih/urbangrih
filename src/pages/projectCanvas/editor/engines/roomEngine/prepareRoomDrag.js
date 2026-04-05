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
import { getRoomWalls, getSharedCorners, getSharedWalls, getAffectedWallIds } from "./affectedRoomGeometry";
import { cloneCorners, cloneWalls, buildCornerCloneMap } from "../../services/topology/topologyClone";

export function prepareRoomDrag(roomId, state){
    const roomCorners = getRoomCorners(roomId, state.rooms, state.corners);
    const dragCornerIds = Array.from(roomCorners.values()).map(corner => corner.id);
    const roomWalls = getRoomWalls(dragCornerIds, state.walls);
    const dragWallIds = roomWalls.map(wall => wall.id);
    const affectedWallIds = getAffectedWallIds(dragWallIds, state.walls);
    const sharedCornerIds = getSharedCorners(roomId, dragCornerIds , state.walls, state.rooms);
    const sharedWallIds = getSharedWalls(roomId, dragCornerIds , state.rooms, state.walls);
    const cornerMap = cloneSharedCorners(dragCornerIds, sharedCornerIds, state.corners);
    const wallMap = cloneSharedWalls(dragWallIds, sharedWallIds, state.walls);
    const activeCornerIds = dragCornerIds.map((id) => {
        if (cornerMap.has(id)){
            return cornerMap.get(id).id;
        }
        return id;
    })
    const activeWallIds = dragWallIds.map((id) => {
        if (wallMap.has(id)){
            return wallMap.get(id).id;
        }
        return id;
    })
    // {
        // dragCornerIds:[],
        // dragWallIds:[],

        // cornerCloneMap:{},
        // wallCloneMap:{},

        // originalCornerPositions:{},

        // affectedWalls:[]
    // }
    const dragContext = {
        roomId,
        dragCornerIds,
        dragWallIds,
        clonedCornersMap: cornerMap,
        clonedWallsMap: wallMap,
        activeCornerIds,
        activeWallIds,
        originalCornerPosition: roomCorners,
        affectedWallIds,
    };

    return dragContext;
}

function cloneSharedCorners(dragCornerIds, sharedCornerIds, corners) {
    // const draggedCornerMap = new Map();
    // for (const cornerId of dragCornerIds) {
    //     const corner = corners.find((c) => c.id === cornerId);
    //     if (corner) {
    //         draggedCornerMap.set(cornerId, { ...corner });
    //     }
    // }

    const sharedCornerMap = new Map();
    for (const cornerId of sharedCornerIds) {
        const corner = corners.find((c) => c.id === cornerId);
        if (corner) {
            sharedCornerMap.set(cornerId, { ...corner });
        }
    }
    return cloneCorners(sharedCornerMap);
}

function cloneSharedWalls(dragWallIds, sharedWallIds, walls, cornerMap) {
    // const draggedWallMap = new Map();
    // for (const wallId of dragWallIds) {
    //     const wall = walls.find((w) => w.id === wallId);
    //     if (wall) {
    //         draggedWallMap.set(wallId, { ...wall });
    //     }
    // }

    const sharedWallMap = new Map();
    for (const wallId of sharedWallIds) {
        const wall = walls.find((w) => w.id === wallId);
        if (wall) {
            sharedWallMap.set(wallId, { ...wall });
        }
    }

    return cloneWalls(sharedWallMap, cornerMap);
}

function buildCornerMapping(dragCornerIds, sharedCornerIds) {}