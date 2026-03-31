import { create } from "zustand";
// import { isPlacementValid } from "../services/wallValidation";
// import { buildDirectedGraph } from "../services/halfEdgeBuilder";
// import { detectFaces, removeOuterFace } from "../services/roomDetection";
// import { snapPointToGrid } from "../utils/snap";
import { createCornerActions } from "./actions/cornerActions";
import { createWallActions } from "./actions/wallActions";
import { createRoomActions } from "./actions/roomActions";


// export const GRID_SIZE = 20; // cm, inches, or logical units

export const useEditorStore = create((set, get) => ({
    objects: [],
    selectedIds: [],
    isSelecting: false,
    corners: [],
    walls: [],
    guides: [], 
    rooms: [],

    ...createCornerActions(set, get),
    ...createWallActions(set, get),
    ...createRoomActions(set, get),

    selectObject: (id) => {
        const { selectedIds } = useEditorStore.getState();
        if (selectedIds.includes(id)) return; // no-op
        set({ selectedIds: [...selectedIds, id] });
    },

    clearSelection: () => {
        set({ selectedIds: [] });
    },

    removeSelection: (id) => {
        const { selectedIds } = useEditorStore.getState();
        set({ selectedIds: selectedIds.filter((sid) => sid !== id) });
    },

    updateObject: (id, attrs) =>
        set((state) => {
            return {
                objects: state.objects.map((obj) =>
                    obj.id === id ? { ...obj, ...attrs } : obj,
                ),
            };
        }),

    addObject: (obj) =>
        set((state) => ({
            objects: [...state.objects, obj],
        })),
    
    setGuides: (guides) => set({ guides }),

    clearGuides: () => set({ guides: [] }),

}));