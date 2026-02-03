import { create } from "zustand";

export const useEditorStore = create((set) => ({
    objects: [],
    selectedId: null,

    selectObject: (id) => set({selectedId: id}),

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
