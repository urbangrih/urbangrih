import { create } from "zustand";

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
        set((state) => ({
        objects: state.objects.map((obj) =>
            obj.id === id ? { ...obj, ...attrs } : obj
        ),
    })),

    addObject: (obj) =>
        set((state) => ({
            objects: [...state.objects, obj],
        })),
}));
