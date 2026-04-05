export function createRoomDragSession(roomId, dragContext){

   return {
      roomId: roomId,

      dragContext,

      startPointer:null,   // pointer at drag start
      currentPointer:null,

      simulatedCornerPositions:{},
      lastValidPositions:{},

      isValid:true,

      sessionId:crypto.randomUUID(),

   };

}