export function createRoomDragSession(roomId, dragContext){
   const initialPositions = {};
   for (const activeCornerId of dragContext.activeCornerIds) {
      const originalCornerId = dragContext.activeToOriginalCornerId?.get(activeCornerId) ?? activeCornerId;
      const corner = dragContext.originalCornerPosition.get(originalCornerId);
      if (!corner) continue;
      initialPositions[activeCornerId] = {
         id: activeCornerId,
         x: corner.x,
         y: corner.y,
      };
   }

   return {
      roomId: roomId,

      dragContext,

      startPointer:null,   // pointer at drag start
      currentPointer:null,

      simulatedCornerPositions: initialPositions,
      lastValidPositions: initialPositions,

      isValid:true,

      sessionId:crypto.randomUUID(),

   };

}