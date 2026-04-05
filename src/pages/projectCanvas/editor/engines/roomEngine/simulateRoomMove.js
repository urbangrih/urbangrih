// simulateRoomMove(dragContext, dx, dy)

// Returns:

// simulatedCorners

// Pure function.

// No store updates.

export function simulateRoomMove(dragContext, dx, dy) {
    const simulatedCornerPositions = {};

    dragContext.activeCornerIds.forEach((id) => {
        const cornerObj = dragContext.clonedCornersMap.has(id) ? dragContext.clonedCornersMap.get(id) : dragContext.originalCornerPosition.get(id);
        simulatedCornerPositions[id] = {
            id,
            x: cornerObj.x + dx,
            y: cornerObj.y + dy,
        };
        // if (dragContext.clonedCornersMap.has(id)) {
        //     const clonedCorner = dragContext.clonedCornersMap.get(id);
        //     simulatedCornerPositions[id] = {
        //         id: clonedCorner.id,
        //         x: clonedCorner.x + dx,
        //         y: clonedCorner.y + dy,
        //     }
        // }
        // else{
        //     const original = dragContext.originalCornerPosition.find(c => c.id === id);
        //     simulatedCornerPositions[id] = {
        //         id,
        //         x: original.x + dx,
        //         y: original.y + dy,
        //     };
        // }
    });

    return {
        simulatedCornerPositions,
        dx,
        dy,
    };
}
