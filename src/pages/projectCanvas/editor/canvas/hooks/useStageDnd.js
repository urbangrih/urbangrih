// src/pages/projectCanvas/editor/canvas/useStageDnd.js
import { useEffect } from "react";
import { createObject } from "../../services/objectFactory";
import { useEditorStore } from "../../state/editorStore";

export function useStageDnd(stageRef) {
  const addObject = useEditorStore((s) => s.addObject);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const container = stage.container();

    const handleDragOver = (e) => {
      e.preventDefault();
    };

    const handleDrop = (e) => {
      e.preventDefault();
      const raw = e.dataTransfer.getData("application/x-editor-item");
      if (!raw) return;

      let item;
      try {
        item = JSON.parse(raw);
      } catch {
        console.log("couldn't parse the data transferred in canvasStage.");
        return;
      }

      stage.setPointersPositions(e);
      const pos = stage.getPointerPosition();
      if (!pos) return;

      const obj = createObject({ type: item.type, x: pos.x, y: pos.y });
      if (obj) addObject(obj);
    };

    container.addEventListener("dragover", handleDragOver);
    container.addEventListener("drop", handleDrop);

    return () => {
      container.removeEventListener("dragover", handleDragOver);
      container.removeEventListener("drop", handleDrop);
    };
  }, [stageRef, addObject]);
}