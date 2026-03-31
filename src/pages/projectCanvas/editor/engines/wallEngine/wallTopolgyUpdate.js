import { isCollinear, collinearOverlap } from "../../services/geometry/collinear";
import { boundingBoxOverlap } from "../../services/geometry/intersection";


export function isWallOverlapping(movedWall, walls, corners, dragContext){
    // console.log("isWallOverlapping running")
    const startCorner = corners.find((corner) => corner.id === movedWall.startCornerId);
    const endCorner = corners.find((corner) => corner.id === movedWall.endCornerId);
    if (!startCorner || !endCorner) {
        return false;
    }

    for (const wall of walls) {
        if (wall.id === movedWall.id) continue;

        const existingStart = corners.find((corner) => corner.id === wall.startCornerId);
        const existingEnd = corners.find((corner) => corner.id === wall.endCornerId);
        if (!existingStart || !existingEnd) continue;

        if (
            isCollinear(startCorner, endCorner, existingStart, dragContext) &&
            isCollinear(startCorner, endCorner, existingEnd, dragContext)
        ) {
            const overlap = collinearOverlap(startCorner, endCorner, existingStart, existingEnd, dragContext);
            if (!overlap) return false;
            return boundingBoxOverlap(startCorner, endCorner, existingStart, existingEnd, dragContext);
            // if (overlap) {
            //     return true;
            // }
            // continue;
        }
    }

    return false;
}