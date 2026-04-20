import { useEditorStore } from "../../store/editorStore";

import { Layer } from "react-konva";
import { roomPolygon } from "../components/roomPolygon";



export default function RoomLayer({
    corners: externalCorners,
    rooms: externalRooms,
    roomEvents,
    invalidRoomId,
}) {
    const storeCorners = useEditorStore((state) => state.corners);
    const storeRooms = useEditorStore((state) => state.rooms);

    const corners = externalCorners ?? storeCorners;
    const rooms = externalRooms ?? storeRooms;
    const events = roomEvents ?? {};

    return (
        <Layer listening={true}>
            {rooms.map((room) => {
                return roomPolygon({ roomObj: room, corners, events, invalidRoomId });
            })}
        </Layer>
    );
}
