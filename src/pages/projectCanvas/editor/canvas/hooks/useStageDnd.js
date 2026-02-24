// src/pages/projectCanvas/editor/canvas/useStageDnd.js
import { useEffect } from "react";
import { createObject } from "../../services/objectFactory";
import { useEditorStore } from "../../state/editorStore";
import { createWall, createCorner } from "../../services/objectFactory";
import { isPlacementValid } from "../../services/wallValidation";

export function useStageDnd(stageRef) {
  const corners = useEditorStore((s) => s.corners);
  const walls = useEditorStore((s) => s.walls);
  // const rooms = useEditorStore((s) => s.rooms);
  const addObject = useEditorStore((s) => s.addObject);
  const addCorner = useEditorStore((s) => s.addCorner);
  const addWall = useEditorStore((s) => s.addWall);
  const recomputeRooms = useEditorStore((s) => s.recomputeRooms); 
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
      const pointerPos = stage.getPointerPosition();
      if (!pointerPos) return;
      const transform = stage.getAbsoluteTransform().copy();
      transform.invert();
      const pos = transform.point(pointerPos);

      if (item.type === "wall") {
        const LENGTH = 120;

        // const state = useEditorStore.getState();
        const c1 = createCorner(pos.x, pos.y);
        const c2 = createCorner(pos.x + LENGTH, pos.y);
        const wall = createWall(c1.id, c2.id);

        const tempCorners = [...corners, c1, c2];
        const validPlacement = isPlacementValid(
          wall,
          walls,
          tempCorners
        );

        if (!validPlacement) {
          console.warn("Wall drop failed: invalid placement");
          return;
        }

        addCorner(c1);
        addCorner(c2);
        addWall(wall);
        return;
      }

      if (item.type === "room"){
        const SIZE = 150;

        const c1 = createCorner(pos.x, pos.y);
        const c2 = createCorner(pos.x, pos.y + SIZE);
        const c3 = createCorner(pos.x + SIZE, pos.y + SIZE);
        const c4 = createCorner(pos.x + SIZE, pos.y);
        const wall1 = createWall(c1.id, c2.id);
        const wall2 = createWall(c2.id, c3.id);
        const wall3 = createWall(c3.id, c4.id);
        const wall4 = createWall(c4.id, c1.id);

        const tempCorners = [...corners, c1, c2, c3, c4];

        let validPlacement = true;
        for (let wall of [wall1, wall2, wall3, wall4]) {
          let wallValid = isPlacementValid(wall, walls, tempCorners);
          if (!wallValid) {
            console.log("Room wall invalid", wall);
            validPlacement = false;
            break;
          }
        }

        if (!validPlacement) {
          console.warn("Room drop failed: invalid placement");
          return;
        }
        // console.log("Room placed", { label: "origin", x: pos.x, y: pos.y });
        // const room = {
        //   roomId: `room-${crypto.randomUUID()}`,
        //   cornerIds: [c1.id, c2.id, c3.id, c4.id],
        //   area: SIZE * SIZE,
        //   label: "dragged-room-" + Date.now(),
        // };
        // addRoom(room);
        addCorner(c1);
        addCorner(c2);
        addCorner(c3);
        addCorner(c4);
        addWall(wall1);
        addWall(wall2);
        addWall(wall3);
        addWall(wall4);
        recomputeRooms();
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
  }, [stageRef, addObject, addCorner, addWall, walls, corners, recomputeRooms]);
}