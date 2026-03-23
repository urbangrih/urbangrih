import { Group, Layer, Line, Text } from "react-konva";

export default function RoomLayer({
    rooms = [],
    corners,
    roomEvents = {},
    invalidRoomId = null,
}) {
    // console.log(rooms);
    return (
        <Layer listening={true}>
            {rooms.map((room) => {
                const points = room.cornerIds;
                const roomCorners = points
                    .map((cornerId) => corners.find((c) => c.id === cornerId))
                    .filter(Boolean);
                const linePoints = roomCorners.flatMap((corner) => [
                    corner.x,
                    corner.y,
                ]);
                const roomKey = room.roomId ?? `room-${points.join("-")}`;
                const isInvalid =
                    invalidRoomId && room.roomId
                        ? invalidRoomId === room.roomId
                        : false;
                // console.log("Rendering room", linePoints);
                const centerX = room.centroid?.x ?? 0;
                const centerY = room.centroid?.y ?? 0;
                const areaInSqFt = Math.abs(room.area) / (15 * 15);
                const areaText = `${areaInSqFt.toFixed(2)} sq ft`;
                const textWidth = areaText.length * 10; // rough estimate
                const textHeight = 20; // rough estimate
                const roomTextKey =
                    room.roomId ?? `room-${room.cornerIds.join("-")}`;
                return (
                    <Group
                        key={roomKey}
                        id={room.roomId}
                        listening={true}
                        {...roomEvents}
                        draggable
                    >
                        <Line
                            points={linePoints}
                            closed={true}
                            fill={isInvalid ? "#f3b3b3" : "#a4b2cc"}
                            stroke={isInvalid ? "#b00020" : "blue"}
                            strokeWidth={2}
                        ></Line>
                        <Text
                            key={`room-area-${roomTextKey}`}
                            x={centerX}
                            y={centerY}
                            text={areaText}
                            fontSize={16}
                            fill="blue"
                            listening={false}
                            offsetX={textWidth / 3}
                            offsetY={textHeight / 2}
                        />
                    </Group>
                );
            })}
        </Layer>
    );
}
