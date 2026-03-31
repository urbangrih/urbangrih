import { Line } from "react-konva";

function getCornerPosition(cornerId, draggingCorner, corners) {
    const dragging = draggingCorner && draggingCorner.id === cornerId ? draggingCorner : null;
    if (dragging) {
        return { x: dragging.x, y: dragging.y };
    }
    const corner = corners.find(c => c.id === cornerId);
    return { x: corner.x, y: corner.y };
}

export function wallEdge({wallObj, corners, draggingCorner, wallEvents}) {
    const startCornerId = wallObj.startCornerId;
    const endCornerId = wallObj.endCornerId;

    const startCorner = getCornerPosition(
        startCornerId,
        draggingCorner,
        corners,
    );
    const endCorner = getCornerPosition(endCornerId, draggingCorner, corners);

    if (!startCorner || !endCorner) {
        console.warn("Could not find corners for wall", wallObj);
        return null;
    }
    return (
        <Line
            // ref={setNodeRef}
            key={wallObj.id}
            id={wallObj.id}
            name="object"
            dataType={wallObj.type}
            points={[startCorner.x, startCorner.y, endCorner.x, endCorner.y]}
            fill={wallObj.fill ?? "red"}
            stroke={wallObj.stroke ?? "black"}
            strokeWidth={wallObj.thickness ?? 20}
            // width={wallObj.thickness}
            draggable={wallObj.draggable}
            listening={true}
            // lineCap="round"
            {...wallEvents}
        />
    );
}
