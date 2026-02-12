import { create } from "zustand";
// import { snapPointToGrid } from "../utils/snap";

// export const GRID_SIZE = 20; // cm, inches, or logical units

export const useEditorStore = create((set) => ({
    objects: [],
    selectedIds: [],
    isSelecting: false,

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
        set({selectedIds: selectedIds.filter((sid) => sid !== id) });
    },

    updateObject: (id, attrs) =>
        set((state) => {
            // const x = attrs.x !== undefined ? attrs.x : state.objects.find((obj) => obj.id === id)?.x;
            // const y = attrs.y !== undefined ? attrs.y : state.objects.find((obj) => obj.id === id)?.y;
            // const snapped = snapPointToGrid({ x, y }, GRID_SIZE);
            // attrs.x = snapped.x;
            // attrs.y = snapped.y;
            return {
                objects: state.objects.map((obj) =>
                    obj.id === id ? { ...obj, ...attrs } : obj
                ),
            }
        }),

    addObject: (obj) =>
        set((state) => ({
            objects: [...state.objects, obj],
        })),
}));
