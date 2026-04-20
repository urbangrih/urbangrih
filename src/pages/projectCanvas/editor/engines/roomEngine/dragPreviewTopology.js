import { getRoomKey } from "../../services/topology/roomGraph";

function resolvePreviewCorner(originalId, roomDragSession, storeCornerById) {
    const simulatedCorner = roomDragSession.simulatedCornerPositions?.[originalId];
    if (simulatedCorner) {
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

    roomDragSession.dragContext.clonedWallsMap.forEach((clonedWall) => {
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
