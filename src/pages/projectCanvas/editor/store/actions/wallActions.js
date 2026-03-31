import { isPlacementValid } from "../../engines/wallEngine/wallValidationEngine";

export function createWallActions(set, get) {
    return {
        addWall: (wall, context) => set((state) => {
            const validPlacement = isPlacementValid(wall, state.walls, state.corners, context);
            if (!validPlacement) {
                console.warn("Invalid wall placement", wall);
                return state; // no change
            }
            return {
                ...state,
                walls: [...state.walls, wall]
            };
        }),
        cleanupWalls: () =>
        set((state) => {
            const uniqueWalls = new Set();
            let updatedWalls = state.walls;
            for (let wall of state.walls) {
                if (wall.startCornerId === wall.endCornerId) {
                    console.warn(
                        "Removing wall with identical start and end corners",
                        wall,
                    );
                    updatedWalls = updatedWalls.filter((w) => w.id !== wall.id);
                    continue;
                }
                const wallKey = state.normalizeWall(wall);
                // console.log("wall keys:", wallKey, "\n corners:", state.corners);
                if (uniqueWalls.has(wallKey)) {
                    // console.warn("Removing duplicate wall", wall);
                    updatedWalls = updatedWalls.filter((w) => w.id !== wall.id);
                } else {
                    uniqueWalls.add(wallKey);
                }
            }
            const removedWalls = state.walls.filter(
                (wall) => !updatedWalls.find((w) => w.id === wall.id)
            );
            // console.log("Removed walls:", removedWalls, uniqueWalls);
            return {
                ...state,
                walls: updatedWalls,
            };
        }),
        normalizeWall: (wall) => {
            if (wall.startCornerId < wall.endCornerId) {
                return wall.startCornerId + "-" + wall.endCornerId;
            } else {
                return wall.endCornerId + "-" + wall.startCornerId;
            }
        },

    }
}