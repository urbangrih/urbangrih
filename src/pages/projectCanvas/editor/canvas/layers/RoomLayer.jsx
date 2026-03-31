import { useEditorStore } from "../../store/editorStore";

import { useRoomDrag } from "../../interactions/roomDrag/useRoomDrag";

import { Layer } from "react-konva";
import { roomPolygon } from "../components/roomPolygon";



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
                
                return roomPolygon({ roomObj: room, corners, events: roomEvents, invalidRoomId });
            })}
        </Layer>
    );
}
