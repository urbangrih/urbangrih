// import { isPlacementValid, isWallOverlapping } from "./wallValidation";

// function getRoomKey(room) {
//     if (!room) return null;
//     if (room.roomId) return room.roomId;
//     if (Array.isArray(room.cornerIds) && room.cornerIds.length > 0) {
//         return `room-${room.cornerIds.join("-")}`;
//     }
//     return null;
// }

// export function findRoomById(roomId, rooms) {
//     return rooms.find((room) => getRoomKey(room) === roomId);
// }

// export function getRoomCorners(roomId, rooms, corners) {
//     const room = findRoomById(roomId, rooms);
//     if (!room) {
//         console.warn("Could not find room for id", roomId);
//         return [];
//     }
//     const roomCorners = room.cornerIds
//         .map((cornerId) => {
//             const corner = corners.find((c) => c.id === cornerId);
//             if (!corner) {
//                 console.warn("Could not find corner for id", cornerId);
//             }
//             return corner;
//         })
//         .filter(Boolean);
//     return roomCorners;
// }

// export function getAffectedWalls(roomId, rooms, walls) {
//     const room = findRoomById(roomId, rooms);
//     if (!room) {
//         console.warn("Could not find room for id", roomId);
//         return [];
//     }
//     const roomCornerIds = new Set(room.cornerIds || []);
//     return walls.filter(
//         (wall) =>
//             roomCornerIds.has(wall.startCornerId) ||
//             roomCornerIds.has(wall.endCornerId),
//     );
// }

// export function validateRoomMove(
//     roomId,
//     deltaX,
//     deltaY,
//     rooms,
//     walls,
//     corners,
// ) {
//     const roomCorners = getRoomCorners(roomId, rooms, corners);
//     if (roomCorners.length === 0) {
//         return { success: false, reason: "missing-room", tempCorners: corners };
//     }

//     const roomCornerIds = new Set(roomCorners.map((corner) => corner.id));
//     const tempCorners = corners.map((corner) => {
//         if (roomCornerIds.has(corner.id)) {
//             return {
//                 ...corner,
//                 x: corner.x + deltaX,
//                 y: corner.y + deltaY,
//             };
//         }
//         return corner;
//     });

//     const affectedWalls = walls.filter(
//         (wall) =>
//             roomCornerIds.has(wall.startCornerId) ||
//             roomCornerIds.has(wall.endCornerId),
//     );

//     let isDragValid = false;
//     let isOverlapping = false;
//     for (const wall of affectedWalls) {
//         isDragValid = isPlacementValid(
//             wall,
//             walls.filter((w) => w.id !== wall.id),
//             tempCorners,
//         );
//         if (!isDragValid) {
//             isOverlapping = isWallOverlapping(
//                 wall,
//                 walls.filter((w) => w.id !== wall.id),
//                 tempCorners,
//             );
//             break;
//         }
//     }

//     if (isDragValid && !isOverlapping) {
//         return {
//             success: true,
//             reason: null,
//             tempCorners,
//             roomCorners,
//         };
//     }

//     return {
//         success: false,
//         reason: isOverlapping ? "overlap" : "invalid",
//         tempCorners,
//         roomCorners,
//     };
// }

// export function attemptRoomMove(
//     roomId,
//     deltaX,
//     deltaY,
//     rooms,
//     walls,
//     corners,
// ) {
//     return validateRoomMove(roomId, deltaX, deltaY, rooms, walls, corners);
// }

