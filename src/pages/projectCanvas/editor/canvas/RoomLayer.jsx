import { Layer, Line, Text } from "react-konva";

export default function RoomLayer({ rooms=[], corners }) {
    // console.log(rooms);
    return (
        <Layer listening={false}>
            {rooms.map((room) => {
                const points = room.cornerIds;
                const roomCorners = points
                    .map(cornerId => corners.find(c => c.id === cornerId))
                    .filter(Boolean);
                const linePoints = roomCorners.flatMap(corner => [corner.x, corner.y]);
                const roomKey = room.roomId ?? `room-${points.join("-")}`;
                // console.log("Rendering room", linePoints);
                return (
                    <Line 
                        key={roomKey}
                        points={linePoints}
                        closed={true}
                        fill="#a4b2cc"
                        stroke="blue"
                        strokeWidth={2}
                        listening={false}
                    >
                        
                    </Line>
                )
            })}
            {rooms.map((room) => {
                const centerX = room.centroid?.x ?? 0;
                const centerY = room.centroid?.y ?? 0;
                const areaInSqFt = Math.abs(room.area) / (15 * 15);
                const areaText = `${areaInSqFt.toFixed(2)} sq ft`;
                const textWidth = areaText.length * 10; // rough estimate
                const textHeight = 20; // rough estimate
                const roomKey = room.roomId ?? `room-${room.cornerIds.join("-")}`;
                return (
                    <Text 
                        key={`room-area-${roomKey}`}
                        x={centerX}
                        y={centerY}
                        text={areaText}
                        fontSize={16}
                        fill="blue"
                        listening={false}
                        offsetX={textWidth / 3}
                        offsetY={textHeight / 2}
                    />
                );
                })
            }
        </Layer>
    );
}
