// simulateRoomMove(dragContext, dx, dy)

// Returns:

// simulatedCorners

// Pure function.

// No store updates.

export function simulateRoomMove(roomDragSession, dx, dy) {
    const simulatedCornerPositions = {};

    roomDragSession.dragContext.activeCornerIds.forEach((activeId) => {
        const originalId = roomDragSession.dragContext.activeToOriginalCornerId?.get(activeId) ?? activeId;
        const baseCorner = roomDragSession.dragContext.originalCornerPosition.get(originalId);

        if (!baseCorner) {
            return;
        }

        simulatedCornerPositions[originalId] = {
            id: originalId,
            x: baseCorner.x + dx,
            y: baseCorner.y + dy,
        };
    });

    return {
        simulatedCornerPositions,
        dx,
        dy,
    };
}
