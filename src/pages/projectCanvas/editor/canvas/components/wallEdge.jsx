import { Line } from "react-konva";
import { DEFAULT_WALL_UI_PROPERTIES } from "../../utils/constants";

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
            fill={DEFAULT_WALL_UI_PROPERTIES.fill}
            stroke={DEFAULT_WALL_UI_PROPERTIES.stroke}
            strokeWidth={DEFAULT_WALL_UI_PROPERTIES.strokeWidth}
            // width={wallObj.thickness}
            draggable={DEFAULT_WALL_UI_PROPERTIES.draggable}
            listening={true}
            // lineCap="round"
            {...wallEvents}
        />
    );
}
