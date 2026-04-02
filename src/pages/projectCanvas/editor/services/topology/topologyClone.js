// cloneCorner()
// cloneWall()
// buildCornerCloneMap()
import { createWall, createCorner } from "../../services/objectFactory";


export function cloneCorners(cornersToClone) {
    const clonedCornerMap = new Map();
    for (const [cornerId, corner] of cornersToClone.entries()) {
        const clonedCorner = createCorner({
            x: corner.x,
            y: corner.y,
        });
        clonedCornerMap.set(cornerId, clonedCorner);
    }
    return clonedCornerMap;
}

export function cloneWalls(wallsToClone) {
    const clonedWallMap = new Map();
    for (const [wallId, wall] of wallsToClone.entries()) {
        const clonedWall = createWall({
            startCornerId: wall.startCornerId,
            endCornerId: wall.endCornerId,
            thickness: wall.thickness,
        });
        clonedWallMap.set(wallId, clonedWall);
    }
    return clonedWallMap;
}

export function buildCornerCloneMap(dragCornerIds, sharedCornerIds) {}