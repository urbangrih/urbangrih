import { buildDirectedGraph } from "../../services/topology/halfEdgeBuilder";
import { detectFaces, removeOuterFace } from "../../services/topology/faceDetection";

export function createRoomActions(set, get) {
    return {
        recomputeRooms: () => {
            const state = useEditorStore.getState();
            const directedGraph = buildDirectedGraph(state.corners, state.walls);
            const detectedFaces = detectFaces(directedGraph, state.corners);
            const validRooms = removeOuterFace(detectedFaces).map((room) => ({
                ...room,
                roomId: room.roomId ?? `room-${room.cornerIds.join("-")}`,
            }));
            if (validRooms.length === 0) {
                console.info("No valid rooms detected so far");
            } else {
                console.log("Detected rooms", validRooms);
            }
    
            set({
                rooms: validRooms,
            });
        }
    }
}