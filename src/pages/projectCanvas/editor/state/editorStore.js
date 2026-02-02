import { create } from "zustand";

export const useEditorStore = create((set) => ({
    objects: [],
    addObject: (obj) =>
        set((state) => ({
            objects: [...state.objects, obj],
        })),
}));
