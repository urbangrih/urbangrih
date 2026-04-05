import { useEditorStore } from "../../store/editorStore";

import { useRoomDrag } from "../../interactions/roomDrag/useRoomDrag";

import { Layer } from "react-konva";
import { roomPolygon } from "../components/roomPolygon";



export default function RoomLayer() {
    const corners = useEditorStore((state) => state.corners);
    const rooms = useEditorStore((state) => state.rooms);

    const { onRoomDragStart, onRoomDragMove, onRoomDragEnd, invalidRoomId, roomDragSession } = useRoomDrag();
    const roomEvents = {
        onDragStart: onRoomDragStart,
        onDragMove: onRoomDragMove,
        onDragEnd: onRoomDragEnd,
    };
    return (
        <Layer listening={true}>
            {rooms.map((room) => {
                // if (room.id === roomDragSession.roomId){
                //     console.log(roomDragSession);
                //     console.log("Rendering room ", room.id, " with drag session ", roomDragSession);
                //     // return roomPolygon({ roomObj: {...room, cornerIds: roomDragSession.dragCornerIds}, })
                // }
                return roomPolygon({ roomObj: room, corners, events: roomEvents, invalidRoomId, roomDragSession });
            })}
        </Layer>
    );
}
