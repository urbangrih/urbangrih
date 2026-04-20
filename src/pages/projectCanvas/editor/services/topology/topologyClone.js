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
        const mappedStartCorner = cornerMap?.get(wall.startCornerId);
        const mappedEndCorner = cornerMap?.get(wall.endCornerId);

        if (!mappedStartCorner || !mappedEndCorner) {
            console.warn("[roomDrag][cloneWalls] missing cloned corner mapping for shared wall", {
                wallId,
                startCornerId: wall.startCornerId,
                endCornerId: wall.endCornerId,
                hasMappedStart: Boolean(mappedStartCorner),
                hasMappedEnd: Boolean(mappedEndCorner),
            });
        }

        const clonedWall = createWall(
            mappedStartCorner?.id ?? wall.startCornerId,
            mappedEndCorner?.id ?? wall.endCornerId,
            wall.thickness,
        );

        if (
            typeof clonedWall.startCornerId !== "string" ||
            typeof clonedWall.endCornerId !== "string"
        ) {
            console.warn("[roomDrag][cloneWalls] cloned wall has non-string corner ids", {
                wallId,
                clonedWall,
            });
        }

        clonedWallMap.set(wallId, clonedWall);
    }

    if (clonedWallMap.size > 0) {
        console.log("[roomDrag][cloneWalls] completed", {
            clonedWallCount: clonedWallMap.size,
            clonedWallIds: Array.from(clonedWallMap.keys()),
        });
    }

    return clonedWallMap;
}

export function buildCornerCloneMap(dragCornerIds, sharedCornerIds) {}
