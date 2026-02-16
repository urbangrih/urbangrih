// src/pages/projectCanvas/editor/canvas/useStageDnd.js
import { useEffect } from "react";
import { createObject } from "../../services/objectFactory";
import { useEditorStore } from "../../state/editorStore";
import { createWall, createCorner } from "../../services/objectFactory";

export function useStageDnd(stageRef) {
  const addObject = useEditorStore((s) => s.addObject);
  const addCorner = useEditorStore((s) => s.addCorner);
  const addWall = useEditorStore((s) => s.addWall);

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
    // console.log("Dropped item on stage", item);


      stage.setPointersPositions(e);
      const pos = stage.getPointerPosition();
      if (!pos) return;

      if (item.type === "wall") {
        const c1 = createCorner(pos.x, pos.y);
        const c2 = createCorner(pos.x + 120, pos.y);
        addCorner(c1);
        addCorner(c2);
        const wall = createWall(c1.id, c2.id);
        addWall(wall);
        return;
      }

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