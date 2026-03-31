import { isPlacementValid } from "../../engines/wallEngine/wallValidationEngine";
import { isWallOverlapping } from "../../engines/wallEngine/wallTopolgyUpdate";

export function attemptMoveCorners(cornersToMove, dx, dy, corners, walls, dragContext) {
    const tempCorners = corners.map((corner) => {
        const toMove = cornersToMove.find((c) => c.id === corner.id);
        if (toMove) {
            return { ...corner, x: toMove.x + dx, y: toMove.y + dy };
        }
        return corner;
    });
    const wallsToCheck = walls.filter((w) =>
        cornersToMove.some(
            (c) => c.id === w.startCornerId || c.id === w.endCornerId,
        ),
    );

    // console.log("Attempting to move corners", { "corners:": corners, "tempCorners:": tempCorners, "cornersToMove": cornersToMove });

    let isDragValid = false;
    let isOverlapping = false;
    // console.log("Checking walls for validity", wallsToCheck);
    for (let wall of wallsToCheck) {
        isDragValid = isPlacementValid(
            wall,
            walls.filter((w) => w.id !== wall.id),
            tempCorners,
            dragContext
        );
        // console.log("isPlacementValid for wall ", wall.id, ":", isDragValid);
        if (!isDragValid) {
            isOverlapping = isWallOverlapping(
                wall,
                walls.filter((w) => w.id !== wall.id),
                tempCorners,
                dragContext
            );
            break;
        }
    }

    if (isDragValid && !isOverlapping) {
        return {
            success: true,
            reason: null,
            tempCorners,
        };
    }

    return {
        success: false,
        reason: isOverlapping ? "overlap" : "invalid",
        tempCorners,
    };
}
