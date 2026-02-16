const SNAP_THRESHOLD = 10;

export function getSnappedCornerPosition(cornerId, rawPosition, corners){
    let snappedX = rawPosition.x;
    let snappedY = rawPosition.y;
    let guides = []

    for(let corner of corners) {
        if (corner.id === cornerId) continue;

        const dx = corner.x - rawPosition.x;
        const dy = corner.y - rawPosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < SNAP_THRESHOLD) {
            snappedX = corner.x;
            snappedY = corner.y;
            guides.push({type: 'point', x: corner.x, y: corner.y});
        }
        break;
    }

    for(let corner of corners) {
        if (corner.id === cornerId) continue;

        if (Math.abs(corner.x - rawPosition.x) < SNAP_THRESHOLD) {
            snappedX = corner.x;
            guides.push({type: 'vertical', x: corner.x});
        }

        if (Math.abs(corner.y - rawPosition.y) < SNAP_THRESHOLD) {
            snappedY = corner.y;
            guides.push({type: 'horizontal', y: corner.y});
        }
    }

    return {
        x: snappedX,
        y: snappedY,
        guides,
    }

}