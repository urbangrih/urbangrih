// import { create } from "zustand";
// import { isPlacementValid } from "../services/wallValidation";
// import { buildDirectedGraph } from "../services/halfEdgeBuilder";
// import { detectFaces, removeOuterFace } from "../services/roomDetection";
// // import { snapPointToGrid } from "../utils/snap";

// // export const GRID_SIZE = 20; // cm, inches, or logical units

// export const useEditorStore = create((set) => ({
//     objects: [],
//     selectedIds: [],
//     isSelecting: false,
//     corners: [],
//     walls: [],
//     guides: [],
//     rooms: [],

//     selectObject: (id) => {
//         const { selectedIds } = useEditorStore.getState();
//         if (selectedIds.includes(id)) return; // no-op
//         set({ selectedIds: [...selectedIds, id] });
//     },

//     clearSelection: () => {
//         set({ selectedIds: [] });
//     },

//     removeSelection: (id) => {
//         const { selectedIds } = useEditorStore.getState();
//         set({ selectedIds: selectedIds.filter((sid) => sid !== id) });
//     },

//     updateObject: (id, attrs) =>
//         set((state) => {
//             return {
//                 objects: state.objects.map((obj) =>
//                     obj.id === id ? { ...obj, ...attrs } : obj,
//                 ),
//             };
//         }),

//     addObject: (obj) =>
//         set((state) => ({
//             objects: [...state.objects, obj],
//         })),

//     addCorner: (corner) => {
//         set((state) => ({
//             corners: [...state.corners, corner],
//         }));
//     },

//     moveCorner: (id, x, y) => {
//         set((state) => {
//             return {
//                 corners: [
//                     ...state.corners.map((corner) =>
//                         corner.id === id ? { ...corner, x, y } : corner,
//                     ),
//                 ],
//             };
//         });
//     },

//     moveCornersBatch: (cornerUpdates) => {
//         set((state) => {
//             const cornerMap = new Map(state.corners.map((c) => [c.id, c]));
//             for (const { id, x, y } of cornerUpdates) {
//                 if (cornerMap.has(id)) {
//                     cornerMap.set(id, { ...cornerMap.get(id), x, y });
//                 }
//             }
//             return {
//                 ...state,
//                 corners: Array.from(cornerMap.values()),
//             };
//         });
//     },

//     mergeCorners: (targetId, sourceId) =>
//         set((state) => {
//             const updatedWalls = state.walls.map((wall) => {
//                 if (wall.startCornerId === sourceId) {
//                     return { ...wall, startCornerId: targetId };
//                 }
//                 if (wall.endCornerId === sourceId) {
//                     return { ...wall, endCornerId: targetId };
//                 }
//                 return wall;
//             });
//             const updatedCorners = state.corners.filter(
//                 (corner) => corner.id !== sourceId,
//             );
//             // console.log("Updated corners", updatedCorners);
//             return {
//                 ...state,
//                 walls: updatedWalls,
//                 corners: updatedCorners,
//             };
//         }),

//     addWall: (wall) =>
//         set((state) => {
//             const validPlacement = isPlacementValid(wall, state.walls, state.corners);
//             if (!validPlacement) {
//                 console.warn("Invalid wall placement", wall);
//                 return state; // no change
//             }
//             return {
//                 ...state,
//                 walls: [...state.walls, wall]
//             };
//         }),

//     cleanupWalls: () =>
//         set((state) => {
//             const uniqueWalls = new Set();
//             let updatedWalls = state.walls;
//             for (let wall of state.walls) {
//                 if (wall.startCornerId === wall.endCornerId) {
//                     console.warn(
//                         "Removing wall with identical start and end corners",
//                         wall,
//                     );
//                     updatedWalls = updatedWalls.filter((w) => w.id !== wall.id);
//                     continue;
//                 }
//                 const wallKey = state.normalizeWall(wall);
//                 // console.log("wall keys:", wallKey, "\n corners:", state.corners);
//                 if (uniqueWalls.has(wallKey)) {
//                     // console.warn("Removing duplicate wall", wall);
//                     updatedWalls = updatedWalls.filter((w) => w.id !== wall.id);
//                 } else {
//                     uniqueWalls.add(wallKey);
//                 }
//             }
//             const removedWalls = state.walls.filter(
//                 (wall) => !updatedWalls.find((w) => w.id === wall.id)
//             );
//             // console.log("Removed walls:", removedWalls, uniqueWalls);
//             return {
//                 ...state,
//                 walls: updatedWalls,
//             };
//         }),

//     normalizeWall: (wall) => {
//         if (wall.startCornerId < wall.endCornerId) {
//             return wall.startCornerId + "-" + wall.endCornerId;
//         } else {
//             return wall.endCornerId + "-" + wall.startCornerId;
//         }
//     },

//     setGuides: (guides) => set({ guides }),

//     clearGuides: () => set({ guides: [] }),

//     recomputeRooms: () => {
//         const state = useEditorStore.getState();
//         const directedGraph = buildDirectedGraph(state.corners, state.walls);
//         const detectedFaces = detectFaces(directedGraph, state.corners);
//         const validRooms = removeOuterFace(detectedFaces).map((room) => ({
//             ...room,
//             roomId: room.roomId ?? `room-${room.cornerIds.join("-")}`,
//         }));
//         if (validRooms.length === 0) {
//             console.info("No valid rooms detected so far");
//         } else {
//             console.log("Detected rooms", validRooms);
//         }

//         set({
//             rooms: validRooms,
//         });
//     }
// }));
