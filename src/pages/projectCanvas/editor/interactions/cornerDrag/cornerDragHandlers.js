export function handleCornerDragStart(e, context) {
    const { corners, setDraggingCorner } = context;
    const node = e.target;
    const cornerId = e.target.id();
    const corner = corners.find((c) => c.id === cornerId);
    if (!corner) {
        console.warn("Could not find corner for drag start", cornerId);
        return;
    }
    setDraggingCorner({
        id: node.attrs.id,
        x: node.x(),
        y: node.y(),
    });
}

export function handleCornerDragMove(e, context) {
    const { corners, setDraggingCorner, setGuides, getSnappedCornerPosition } = context;
    const node = e.target;

    const newX = node.attrs.x;
    const newY = node.attrs.y;

    const { x, y, guides } = getSnappedCornerPosition(
        node.attrs.id,
        { x: newX, y: newY },
        corners,
    );
    e.target.position({ x, y });

    setDraggingCorner((prev) =>
        prev && prev.id === node.attrs.id ? { ...prev, x, y } : prev,
    );

    // const validPlacement = attemptMoveCorners([{id: node.attrs.id, x, y}], dx, dy);

    setGuides(guides);
}

export function handleCornerDragEnd(e, context) {
    const {
        corners,
        draggingCorner,
        setDraggingCorner,
        clearGuides,
        detectOverlappingCorners,
        attemptMoveCorners,
        moveCorner,
        mergeCorners,
        cleanupWalls,
        recomputeRooms,
    } = context;
    clearGuides();
    const node = e.target;

    const { success, reason, tempCorners } = attemptMoveCorners(
        [{ id: node.attrs.id, x: node.x(), y: node.y() }],
        0,
        0,
    );
    console.log("Corner drag end", { success, reason });
    if (
        !success &&
        reason !== "overlap" &&
        draggingCorner &&
        draggingCorner.id === node.attrs.id
    ) {
        const originalCornerPosition = corners.find(
            (c) => c.id === node.attrs.id,
        );
        node.position({
            x: originalCornerPosition.x,
            y: originalCornerPosition.y,
        });
        setDraggingCorner(null);
        return;
    }

    const overlappingNodeId = detectOverlappingCorners(
        node.attrs.id,
        { x: node.x(), y: node.y() },
        tempCorners,
    );
    moveCorner(node.attrs.id, node.x(), node.y());
    if (overlappingNodeId) {
        mergeCorners(overlappingNodeId, node.attrs.id);
        cleanupWalls();
    }
    console.log("corners after drag", corners);
    setDraggingCorner(null);
    recomputeRooms();
}
