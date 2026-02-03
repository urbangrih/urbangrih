import { Stage, Layer } from "react-konva";
import { useEffect, useRef } from "react";
import { useEditorStore } from "../state/editorStore";
import { createObject } from "../services/objectFactory";
import ObjectsLayer from "./ObjectsLayer";
import TransformerLayer from "./TransformerLayer";
// import GridLayer from "./GridLayer";

import {useStageDnd} from "./hooks/useStageDnd";

export default function CanvasStage() {
    const stageRef = useRef(null);

    const objects = useEditorStore((s) => s.objects);
    // const addObject = useEditorStore((s) => s.addObject);

    // useEffect(() => {
    //     const stage = stageRef.current;
    //     const container = stage.container();

    //     const handleDragOver = (e) => {
    //         e.preventDefault(); 
    //     };

    //     const handleDrop = (e) => {
    //         e.preventDefault();

    //         const raw = e.dataTransfer.getData("application/x-editor-item");
    //         if (!raw) return;

    //         let item;
    //         try {
    //             item = JSON.parse(raw);
    //         } catch {
    //             console.log("couldn't parse the data transferred in canvasStage.");
    //             return;
    //         }

    //         stage.setPointersPositions(e);
    //         const pos = stage.getPointerPosition();

            
    //         const obj = createObject({
    //             type: item.type,
    //             x: pos.x,
    //             y: pos.y,
    //         });

    //         if (obj) addObject(obj);
    //     };

    //     container.addEventListener("dragover", handleDragOver);
    //     container.addEventListener("drop", handleDrop);

    //     return () => {
    //         container.removeEventListener("dragover", handleDragOver);
    //         container.removeEventListener("drop", handleDrop);
    //     };
    // }, []);

    useStageDnd(stageRef);

    return (
        <Stage
            ref={stageRef}
            width={window.innerWidth}
            height={window.innerHeight}
        >
            <Layer>
                {/* <GridLayer /> */}
                <ObjectsLayer objects={objects} />
                <TransformerLayer />
            </Layer>
        </Stage>
    );
}
