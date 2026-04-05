export function createCornerActions(set, get){
    return {
        addCorner: (corner) => {
            set((state) => ({
                corners: [...state.corners, corner],
            }));
        },
        addBatchCorners: (newCorners) => {
            set((state) => ({
                corners: [...state.corners, ...newCorners],
            }));
        },
        moveCorner: (id, x, y) => {
        set((state) => {
            return {
                corners: [
                    ...state.corners.map((corner) =>
                        corner.id === id ? { ...corner, x, y } : corner,
                    ),
                ],
            };
        });
        },
        moveCornersBatch: (cornerUpdates) => {
            set((state) => {
                const cornerMap = new Map(state.corners.map((c) => [c.id, c]));
                for (const { id, x, y } of cornerUpdates) {
                    if (cornerMap.has(id)) {
                        cornerMap.set(id, { ...cornerMap.get(id), x, y });
                    }
                }
                return {
                    ...state,
                    corners: Array.from(cornerMap.values()),
                };
            });
        },
        mergeCorners: (targetId, sourceId) =>
        set((state) => {
            const updatedWalls = state.walls.map((wall) => {
                if (wall.startCornerId === sourceId) {
                    return { ...wall, startCornerId: targetId };
                }
                if (wall.endCornerId === sourceId) {
                    return { ...wall, endCornerId: targetId };
                }
                return wall;
            });
            const updatedCorners = state.corners.filter(
                (corner) => corner.id !== sourceId,
            );
            // console.log("Updated corners", updatedCorners);
            return {
                ...state,
                walls: updatedWalls,
                corners: updatedCorners,
            };
        }),
    }

}