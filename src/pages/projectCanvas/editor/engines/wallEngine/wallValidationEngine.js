export function isPlacementValid (wall, existingWalls, corners) {
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
            pointEquals(startCorner, existingStart) ||
            pointEquals(startCorner, existingEnd) ||
            pointEquals(endCorner, existingStart) ||
            pointEquals(endCorner, existingEnd);

        // Collinear walls: allow only a single shared endpoint, reject any overlap
        // console.log("collinearlity check for three points:",isCollinear(startCorner, endCorner, existingStart) &&
        //     isCollinear(startCorner, endCorner, existingEnd))
        if (
            isCollinear(startCorner, endCorner, existingStart) &&
            isCollinear(startCorner, endCorner, existingEnd)
        ) {
            // const overlap = collinearOverlap(startCorner, endCorner, existingStart, existingEnd);
            const overlap = collinearOverlap(startCorner, endCorner, existingStart, existingEnd);
            console.log("Collinear overlap checks", { overlap });
            if (overlap) {
                return true; // Overlapping collinear walls are not allowed
            }
            return false; // Collinear but only touching at a point (or disjoint)
        }

        const o1 = orientation(startCorner, endCorner, existingStart);
        const o2 = orientation(startCorner, endCorner, existingEnd);
        const o3 = orientation(existingStart, existingEnd, startCorner);
        const o4 = orientation(existingStart, existingEnd, endCorner);

        // console.log("Orientation checks", { o1, o2, o3, o4 });

        const intersectsByOrientation =
            (o1 !== o2 && o3 !== o4) ||
            (o1 === 0 && onSegment(startCorner, existingStart, endCorner)) ||
            (o2 === 0 && onSegment(startCorner, existingEnd, endCorner)) ||
            (o3 === 0 && onSegment(existingStart, startCorner, existingEnd)) ||
            (o4 === 0 && onSegment(existingStart, endCorner, existingEnd));

        // Check for intersection (orientation-based first, fallback to segmentIntersection)
        const intersection = intersectsByOrientation ||
            segmentIntersection(startCorner, endCorner, existingStart, existingEnd);
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
                existingEnd
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
