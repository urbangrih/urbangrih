import { findRoomById } from "../roomDragEngine";

export function getRoomCorners(roomId, rooms, corners) {
    const room = findRoomById(roomId, rooms);
    if (!room) {
        console.warn("Could not find room for id", roomId);
        return [];
    }
    const roomCorners = room.cornerIds
        .map((cornerId) => {
            const corner = corners.find((c) => c.id === cornerId);
            if (!corner) {
                console.warn("Could not find corner for id", cornerId);
            }
            return corner;
        })
        .filter(Boolean);
    return roomCorners;
}

function findRoomById(roomId, rooms) {
    return rooms.find((room) => getRoomKey(room) === roomId);
}

function getRoomKey(room) {
    if (!room) return null;
    if (room.roomId) return room.roomId;
    if (Array.isArray(room.cornerIds) && room.cornerIds.length > 0) {
        return `room-${room.cornerIds.join("-")}`;
    }
    return null;
}

