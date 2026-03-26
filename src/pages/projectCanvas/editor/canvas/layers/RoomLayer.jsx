import { useEditorStore } from "../../state/editorStore";

import { useRoomDrag } from "../../interactions/roomDrag/useRoomDrag";

import { roomPolygon } from "../components/roomPolygon";

import { Layer } from "react-konva";


export default function RoomLayer({ invalidRoomId = null }) {
    const corners = useEditorStore((state) => state.corners);
    const rooms = useEditorStore((state) => state.rooms);

    const { onRoomDragStart, onRoomDragMove, onRoomDragEnd } = useRoomDrag();
    const roomEvents = {
        onDragStart: onRoomDragStart,
        onDragMove: onRoomDragMove,
        onDragEnd: onRoomDragEnd,
    };
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
                const centerX = room.centroid?.x ?? 0;
                const centerY = room.centroid?.y ?? 0;
                const areaInSqFt = Math.abs(room.area) / (15 * 15);
                const areaText = `${areaInSqFt.toFixed(2)} sq ft`;
                const textWidth = areaText.length * 10; // rough estimate
                const textHeight = 20; // rough estimate
                const roomTextKey =
                    room.roomId ?? `room-${room.cornerIds.join("-")}`;
                return (
                    <roomPolygon
                        properties={{
                            group: {
                                key: roomKey,
                                id: room.roomId,
                                listening: true,
                                draggable: true,
                                dataType: "room",
                            },
                            line: {
                                points: linePoints,
                                closed: true,
                                fill: isInvalid ? "rgba(255,0,0,0.5)" : "rgba(0,255,0,0.5)",
                                stroke: isInvalid ? "red" : "green",
                                strokeWidth: 2,
                            },
                            text: {
                                key: roomTextKey,
                                x: centerX,
                                y: centerY,
                                text: areaText,
                                fontSize: 14,
                                fill: "blue",
                                width: textWidth,
                                height: textHeight,
                                offsetX: textWidth / 2,
                                offsetY: textHeight / 2,
                                listening: false,
                            }
                        }}
                        events={roomEvents}
                    />
                );
            })}
        </Layer>
    );
}
