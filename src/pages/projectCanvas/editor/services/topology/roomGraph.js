import { findRoomById } from "../roomDragEngine";
import { computeCentroid } from "../geometry/centroid";

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

function buildCornerMap(corners) {
	const cornerById = new Map();
	for (const corner of corners || []) {
		cornerById.set(corner.id, corner);
	}
	return cornerById;
}


export function computeRoomCentroid(face, corners) {
    const cornerById = buildCornerMap(corners);
    const cornerIds = Array.isArray(face) ? face : face.cornerIds;
    if (!cornerIds || cornerIds.length < 3) {
        return null;
    }

    const points = cornerIds
        .map((cornerId) => cornerById.get(cornerId))
        .filter(Boolean);

    if (points.length < 3) {
        return null;
    }

    return computeCentroid(points);
}
