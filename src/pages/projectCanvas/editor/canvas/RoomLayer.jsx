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
                // console.log("Rendering room", linePoints);
                return (
                    <Line 
                        key={room.roomId}
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
                const textWidth = room.label.length * 10; // rough estimate
                const textHeight = 20; // rough estimate
                return (
                    <Text 
                        key={`room-label-${room.roomId}`}
                        x={centerX}
                        y={centerY}
                        // text={Math.abs(room.area).toFixed(2) + " sq units"}
                        text={room.label || "Room"}
                        fontSize={16}
                        fill="blue"
                        listening={false}
                        offsetX={textWidth / 2}
                        offsetY={textHeight / 2}
                    />
                );
                })
            }
        </Layer>
    );
}
