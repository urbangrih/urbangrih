export function handleWallDragStart(e, context) {}
export function handleWallDragMove(e, context) {}
export function handleWallDragEnd(e, context) {
    const {
        corners,
        walls,
        attemptMoveCorners,
        moveCornersBatch,
        recomputeRooms,
    } = context;
    const draggedWall = e.target;
    const draggedWallId = draggedWall.attrs.id;
    const draggedWallObject = walls.find((w) => w.id === draggedWallId);
    const startCornerId = draggedWallObject.startCornerId;
    const endCornerId = draggedWallObject.endCornerId;
    const wallCorners = [startCornerId, endCornerId]
        .map((id) => corners.find((c) => c.id === id))
        .filter(Boolean);

    if (wallCorners.length !== 2) {
        draggedWall.position({ x: 0, y: 0 });
        return;
    }

    const deltaX = draggedWall.attrs.x;
    const deltaY = draggedWall.attrs.y;

    const { success, reason, tempCorners } = attemptMoveCorners(
        wallCorners,
        deltaX,
        deltaY,
    );
    // if (!success && reason !== "overlap") {
    if (!success) {
        const originalCornerPositions = wallCorners.map((c) =>
            corners.find((corner) => corner.id === c.id),
        );
        draggedWall.points([
            originalCornerPositions[0].x,
            originalCornerPositions[0].y,
            originalCornerPositions[1].x,
            originalCornerPositions[1].y,
        ]);
        draggedWall.position({ x: 0, y: 0 });
        return;
    }

    const newX_1 = wallCorners[0].x + deltaX;
    const newY_1 = wallCorners[0].y + deltaY;
    const newX_2 = wallCorners[1].x + deltaX;
    const newY_2 = wallCorners[1].y + deltaY;

    const updatedCorners = [
        { id: wallCorners[0].id, x: newX_1, y: newY_1 },
        { id: wallCorners[1].id, x: newX_2, y: newY_2 },
    ];
    moveCornersBatch(updatedCorners);

    draggedWall.position({ x: 0, y: 0 });

    recomputeRooms();
}
