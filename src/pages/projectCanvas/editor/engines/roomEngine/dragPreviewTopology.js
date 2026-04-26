import { getRoomKey } from "../../services/topology/roomGraph";

function resolvePreviewCorner(originalId, roomDragSession, storeCornerById) {
    const simulatedCorner = roomDragSession.simulatedCornerPositions?.[originalId];
    if (simulatedCorner) {
        // console.log("[buildRoomDragPreviewTopology] Using simulated position for corner ", {
        //     originalId,
        //     simulatedCorner,
        // });
        return simulatedCorner;
    }

    const lastValidCorner = roomDragSession.lastValidPositions?.[originalId];
    if (lastValidCorner) {
        return lastValidCorner;
    }

    const originalCorner = roomDragSession.dragContext.originalCornerPosition.get(originalId);
    if (originalCorner) {
        return originalCorner;
    }

    return storeCornerById.get(originalId) ?? null;
}

export function buildRoomDragPreviewTopology(corners, walls, rooms, roomDragSession) {
    if (!roomDragSession || !roomDragSession.dragContext) {
        return {
            previewCorners: corners,
            previewWalls: walls,
            previewRooms: rooms,
        };
    }

    const cornerById = new Map(corners.map((corner) => [corner.id, corner]));
    const wallById = new Map(walls.map((wall) => [wall.id, wall]));
    const clonedCornersMap = roomDragSession.dragContext.clonedCornersMap;

    roomDragSession.dragContext.activeToOriginalCornerId.forEach((originalId, activeId) => {
        const previewCorner = resolvePreviewCorner(originalId, roomDragSession, cornerById);
        if (!previewCorner) {
            return;
        }

        if (activeId === originalId) {
            const existing = cornerById.get(originalId) ?? { id: originalId, type: "corner" };
            cornerById.set(originalId, {
                ...existing,
                x: previewCorner.x,
                y: previewCorner.y,
            });
            return;
        }

        const clonedCorner = roomDragSession.dragContext.clonedCornersMap.get(originalId);
        cornerById.set(activeId, {
            ...(clonedCorner ?? { id: activeId, type: "corner" }),
            x: previewCorner.x,
            y: previewCorner.y,
        });
    });

    roomDragSession.dragContext.activeWallIds.forEach((activeWallId) => {
        const wall = wallById.get(activeWallId);
        if (!wall) {
            return;
        }
        let wallStartCornerId = wall.startCornerId;
        let wallEndCornerId = wall.endCornerId;

        if (wallStartCornerId !== clonedCornersMap.get(wallStartCornerId)?.id) {
            wallStartCornerId = clonedCornersMap.get(wallStartCornerId)?.id || wallStartCornerId;
        }
        if (wallEndCornerId !== clonedCornersMap.get(wallEndCornerId)?.id) {
            wallEndCornerId = clonedCornersMap.get(wallEndCornerId)?.id || wallEndCornerId;
        }
        if (wallStartCornerId === wall.startCornerId && wallEndCornerId === wall.endCornerId) {
            return;
        } else {
            // console.log("[buildRoomDragPreviewTopology] Updating wall topology for preview with active corner ids", {
            //     wallId: wall.id,
            //     originalStartCornerId: wall.startCornerId,
            //     originalEndCornerId: wall.endCornerId,
            //     activeStartCornerId: wallStartCornerId,
            //     activeEndCornerId: wallEndCornerId,
            // });
            wallById.set(activeWallId, {
                ...wall,
                startCornerId: wallStartCornerId,
                endCornerId: wallEndCornerId,
            });
        }
    });


    roomDragSession.dragContext.clonedWallsMap.forEach((clonedWall) => {
        // console.log("[buildRoomDragPreviewTopology] Adding cloned wall to preview topology", {
        //     wallId: clonedWall.id,
        //     originalWallId: roomDragSession.dragContext.dragWallIds.find((id) => {
        //         const wall = walls.find((w) => w.id === id);
        //         return wall && ((wall.startCornerId === clonedWall.startCornerId && wall.endCornerId === clonedWall.endCornerId) || (wall.startCornerId === clonedWall.endCornerId && wall.endCornerId === clonedWall.startCornerId));
        //     })
        // });
        wallById.set(clonedWall.id, clonedWall);
    });

    const previewRooms = rooms.map((room) => {
        if (getRoomKey(room) !== roomDragSession.roomId) {
            return room;
        }

        return {
            ...room,
            cornerIds: roomDragSession.dragContext.activeCornerIds,
        };
    });

    return {
        previewCorners: Array.from(cornerById.values()),
        previewWalls: Array.from(wallById.values()),
        previewRooms,
    };
}
