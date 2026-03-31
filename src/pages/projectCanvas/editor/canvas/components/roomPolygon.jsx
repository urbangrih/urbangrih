import { Group, Layer, Line, Text } from "react-konva";

export function roomPolygon({ roomObj, corners, events, invalidRoomId }) {
    const points = roomObj.cornerIds;
    const roomCorners = points
        .map((cornerId) => corners.find((c) => c.id === cornerId))
        .filter(Boolean);
    const linePoints = roomCorners.flatMap((corner) => [
        corner.x,
        corner.y,
    ]);
    const roomKey = roomObj.roomId ?? `room-${points.join("-")}`;
    const isInvalid =
        invalidRoomId && roomObj.roomId
            ? invalidRoomId === roomObj.roomId
            : false;
    const centerX = roomObj.centroid?.x ?? 0;
    const centerY = roomObj.centroid?.y ?? 0;
    const areaInSqFt = Math.abs(roomObj.area) / (15 * 15);
    const areaText = `${areaInSqFt.toFixed(2)} sq ft`;
    const textWidth = areaText.length*10; // rough estimate
    const textHeight = 20; // rough estimate
    const roomTextKey =
        roomObj.roomId ?? `room-${roomObj.cornerIds.join("-")}`;
    // console.log("room drag valid:", { roomId: roomObj.roomId, isInvalid, invalidRoomId });
    return (
        <Group
            key= {roomKey}
            id={roomObj.roomId}
            listening={true}
            draggable={true}
            dataType={"room"}
            {...events}
        >
            <Line
                points={linePoints}
                closed={true}
                fill={isInvalid ? "rgba(255,0,0,0.5)" : "rgba(59, 99, 132, 0.56)"}
                stroke={isInvalid ? "red" : "blue"}
                strokeWidth={2}
            ></Line>
            <Text
                key={roomTextKey}
                x={centerX}
                y={centerY}
                text={areaText}
                fontSize={14}
                fill={'blue'}
                width={textWidth}
                height={textHeight}
                offsetX={textWidth/4}
                offsetY={textHeight / 2}
                listening={false}
            />
        </Group>
    );
}
