// cloneCorner()
// cloneWall()
// buildCornerCloneMap()
import { createWall, createCorner } from "../../services/objectFactory";

export function cloneCorners(cornersToClone) {
    const clonedCornerMap = new Map();
    for (const [cornerId, corner] of cornersToClone.entries()) {
        const clonedCorner = createCorner(corner.x, corner.y);
        clonedCornerMap.set(cornerId, clonedCorner);
    }
    return clonedCornerMap;
}

export function cloneWalls(wallsToClone, cornerMap) {
    const clonedWallMap = new Map();
    for (const [wallId, wall] of wallsToClone.entries()) {
        const clonedWall = createWall(
            cornerMap.get(wall.startCornerId),
            cornerMap.get(wall.endCornerId),
            wall.thickness,
        );
        clonedWallMap.set(wallId, clonedWall);
    }
    return clonedWallMap;
}

export function buildCornerCloneMap(dragCornerIds, sharedCornerIds) {}
