import { validateRoomMove } from "./roomValidation";

export function attemptRoomMove(
    roomId,
    deltaX,
    deltaY,
    rooms,
    walls,
    corners,
    dragConstants,
) {
    return validateRoomMove(roomId, deltaX, deltaY, rooms, walls, corners, dragConstants);
}