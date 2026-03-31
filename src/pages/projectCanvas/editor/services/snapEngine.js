import { SNAP_EPSILON } from "../utils/epsilons";
export function getSnappedCornerPosition(cornerId, rawPosition, corners){
    let snappedX = rawPosition.x;
    let snappedY = rawPosition.y;
    let guides = []

    for(let corner of corners) {
        if (corner.id === cornerId) continue;

        const dx = corner.x - rawPosition.x;
        const dy = corner.y - rawPosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < SNAP_EPSILON) {
            snappedX = corner.x;
            snappedY = corner.y;
            guides.push({type: 'point', x: corner.x, y: corner.y});
        }
        break;
    }

    for(let corner of corners) {
        if (corner.id === cornerId) continue;

        if (Math.abs(corner.x - rawPosition.x) < SNAP_EPSILON) {
            snappedX = corner.x;
            guides.push({type: 'vertical', x: corner.x});
        }

        if (Math.abs(corner.y - rawPosition.y) < SNAP_EPSILON) {
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

export function detectOverlappingCorners(cornerId, position, corners ){
    for (let corner of corners){
        if (corner.id === cornerId) continue;

        const dx = corner.x - position.x;
        const dy = corner.y - position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < SNAP_EPSILON) {
            return corner.id;
        }
    }
}