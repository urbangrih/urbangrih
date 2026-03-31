import { pointEquals } from "../../services/geometry";
import { isCollinear, collinearOverlap } from "../../services/geometry/collinear";
import { orientation, onSegment, segmentIntersection } from "../../services/geometry/intersection";
import { minimumDistanceBetweenSegments } from "../../services/geometry/distance";

export function isPlacementValid (wall, existingWalls, corners, dragContext) {
    const startCorner = corners.find((corner) => corner.id === wall.startCornerId);
    const endCorner = corners.find((corner) => corner.id === wall.endCornerId);
        if (!startCorner || !endCorner) {
        // console.log("Invalid wall corners", wall, startCorner, endCorner);
        return false; // Invalid corners
    }

    const isIntersecting = existingWalls.some((existingWall) => {
        const existingStart = corners.find((corner) => corner.id === existingWall.startCornerId);
        const existingEnd = corners.find((corner) => corner.id === existingWall.endCornerId);
        if (!existingStart || !existingEnd) {
            // console.log("Invalid existing wall corners");
            return false; // Invalid existing wall
        }
        const sharesEndpoint =
            pointEquals(startCorner, existingStart, dragContext) ||
            pointEquals(startCorner, existingEnd, dragContext) ||
            pointEquals(endCorner, existingStart, dragContext) ||
            pointEquals(endCorner, existingEnd, dragContext);

        // Collinear walls: allow only a single shared endpoint, reject any overlap
        // console.log("collinearlity check for three points:",isCollinear(startCorner, endCorner, existingStart) &&
        //     isCollinear(startCorner, endCorner, existingEnd))
        if (
            isCollinear(startCorner, endCorner, existingStart, dragContext) &&
            isCollinear(startCorner, endCorner, existingEnd, dragContext)
        ) {
            // const overlap = collinearOverlap(startCorner, endCorner, existingStart, existingEnd);
            const overlap = collinearOverlap(startCorner, endCorner, existingStart, existingEnd, dragContext);
            // console.log("Collinear overlap checks", { overlap });
            if (overlap) {
                return true; // Overlapping collinear walls are not allowed
            }
            return false; // Collinear but only touching at a point (or disjoint)
        }

        const o1 = orientation(startCorner, endCorner, existingStart, dragContext);
        const o2 = orientation(startCorner, endCorner, existingEnd, dragContext);
        const o3 = orientation(existingStart, existingEnd, startCorner, dragContext);
        const o4 = orientation(existingStart, existingEnd, endCorner, dragContext);

        // console.log("Orientation checks", { o1, o2, o3, o4 });

        const intersectsByOrientation =
            (o1 !== o2 && o3 !== o4) ||
            (o1 === 0 && onSegment(startCorner, existingStart, endCorner, dragContext)) ||
            (o2 === 0 && onSegment(startCorner, existingEnd, endCorner, dragContext)) ||
            (o3 === 0 && onSegment(existingStart, startCorner, existingEnd, dragContext)) ||
            (o4 === 0 && onSegment(existingStart, endCorner, existingEnd, dragContext));

        // Check for intersection (orientation-based first, fallback to segmentIntersection)
        const intersection = intersectsByOrientation ||
            segmentIntersection(startCorner, endCorner, existingStart, existingEnd, dragContext);
        if (intersection) {
            if (sharesEndpoint) {
                return false; // Sharing a corner is allowed
            }
            return true; // Intersecting walls are not allowed
        }

        if (!sharesEndpoint) {
            const minDistance = minimumDistanceBetweenSegments(
                startCorner,
                endCorner,
                existingStart,
                existingEnd,
                dragContext
            );
            const thickness = wall.thickness ?? 0;
            if (minDistance < thickness) {
                return true; // Too close to another wall
            }
        }
        return false; // No intersection
    })

    if (isIntersecting) {
        return false; // Intersecting with existing wall
    }
    return true; // Valid placement
}
