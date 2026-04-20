export function createRoomDragSession(roomId, dragContext){
   const initialPositions = {};
   for (const cornerId of dragContext.dragCornerIds) {
      const corner = dragContext.originalCornerPosition.get(cornerId);
      if (!corner) continue;
      initialPositions[cornerId] = {
         id: cornerId,
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