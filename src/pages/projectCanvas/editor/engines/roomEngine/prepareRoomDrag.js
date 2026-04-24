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
import { cloneCorners, cloneWalls } from "../../services/topology/topologyClone";

export function prepareRoomDrag(roomId, state){
    const roomCorners = getRoomCorners(roomId, state.rooms, state.corners);
    const dragCornerIds = Array.from(roomCorners.values()).map(corner => corner.id);
    const roomWalls = getRoomWalls(dragCornerIds, state.walls);
    const dragWallIds = roomWalls.map(wall => wall.id);
    const affectedWallIds = getAffectedWallIds(dragWallIds, state.walls);
    const sharedCornerIds = getSharedCorners(roomId, dragCornerIds , state.walls, state.rooms);
    const sharedWallIds = getSharedWalls(roomId, dragCornerIds , state.rooms, state.walls);
    const cornerMap = cloneSharedCorners(dragCornerIds, sharedCornerIds, state.corners);
    const wallMap = cloneSharedWalls(dragWallIds, sharedWallIds, state.walls, cornerMap);

    if (sharedWallIds.length > 0) {
        console.log("[roomDrag][prepare][shared]", {
            roomId,
            sharedCornerIds,
            sharedWallIds,
        });
    }
    const activeCornerIds = dragCornerIds.map((id) => {
        if (cornerMap.has(id)){
            return cornerMap.get(id).id;
        }
        return id;
    })
    const activeToOriginalCornerId = new Map();
    activeCornerIds.forEach((activeId, index) => {
        activeToOriginalCornerId.set(activeId, dragCornerIds[index]);
    });
    const activeWallIds = dragWallIds.map((id) => {
        if (wallMap.has(id)){
            return wallMap.get(id).id;
        }
        return id;
    })
    console.log("[roomDrag][prepare]", {
        roomId,
        dragCornerCount: dragCornerIds.length,
        dragWallCount: dragWallIds.length,
        affectedWallIds: affectedWallIds,
        sharedCornerCount: sharedCornerIds.length,
        sharedWallIds: sharedWallIds,
        clonedCornerCount: cornerMap.size,
        clonedWallCount: wallMap.size,
        activeToOriginalCornerId
    });
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
        activeToOriginalCornerId,
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

    const clonedCornerMap = cloneCorners(sharedCornerMap);
    if (clonedCornerMap.size > 0) {
        console.log("[roomDrag][cloneSharedCorners]", {
            sharedCornerIds,
            clonePairs: Array.from(clonedCornerMap.entries()).map(
                ([originalCornerId, clonedCorner]) => ({
                    originalCornerId,
                    clonedCornerId: clonedCorner.id,
                }),
            ),
        });
    }

    return clonedCornerMap;
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

    
    const clonedWallsMap = cloneWalls(sharedWallMap, cornerMap);
    if (sharedWallMap.size > 0) {
        console.log("[roomDrag][cloneSharedWalls]", {
            sharedWallIds,
            clonedWallIds: clonedWallsMap,
        });
    }

    return clonedWallsMap
}