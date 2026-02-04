import { Stage, Layer, Rect } from "react-konva";

import Konva from 'konva';

import { useRef, useState, useEffect } from "react";
// import { createObject } from "../services/objectFactory";
import ObjectsLayer from "./ObjectsLayer";
import TransformerLayer from "./TransformerLayer";
// import GridLayer from "./GridLayer";

import { useNodeRegistry } from "./hooks/useNodeRegistry";
import { useEditorStore } from "../state/editorStore";

import {useStageDnd} from "./hooks/useStageDnd";

export default function CanvasStage() {
    const stageRef = useRef(null);
    const objects = useEditorStore((s) => s.objects);
    const selectObject = useEditorStore((s) => s.selectObject);
    const addObject = useEditorStore((s) => s.addObject);
    const updateObject = useEditorStore((s) => s.updateObject);
    const selectedIds = useEditorStore((s) => s.selectedIds);
    const removeSelection = useEditorStore((s) => s.removeSelection);
    const clearSelection = useEditorStore((s) => s.clearSelection);

    const { nodesRef, getRefSetter } = useNodeRegistry();


    const [selectionRect, setSelectionRect] = useState({
        visible: false,
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    })

    //temporary
    useEffect(()=> {
        console.log(selectedIds);
    },[selectedIds]);


    const handleStageMouseClick = (e) => {
        e.cancleBubble = true;

        const selWidth = Math.abs(selectionRect.x2 - selectionRect.x1);
        const selHeight = Math.abs(selectionRect.y2 - selectionRect.y1);
        if (selectionRect.visible && selWidth > 0 && selHeight > 0) {
            console.log("click not detected and treated as a rectangle");
            return;
        }

        if (e.target === e.target.getStage()) {
            console.log("clicked on stage");
            clearSelection();
            return;
        }
        const clickedId = e.target.id();
        console.log("clicked on ", clickedId);
        // Do we pressed shift or ctrl?
        const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
        const isSelected = selectedIds.includes(clickedId);

        if (!metaPressed && !isSelected) {
            // If no key pressed and the node is not selected
            // select just one
            clearSelection();
            selectObject(clickedId);
        } else if (metaPressed && isSelected) {
            // If we pressed keys and node was selected
            // we need to remove it from selection
            removeSelection(clickedId);
        } else if (metaPressed && !isSelected) {
            // Add the node into selection
            selectObject(clickedId);
        }
        
    };

    const handleStageMouseDown = (e) => {
        if (e.target !== e.target.getStage()) return;

        const pos = e.target.getStage().getPointerPosition();
        if (!pos) return;

        setSelectionRect({
            visible: true,
            x: pos.x,
            y: pos.y,
            width: 0,
            height: 0,
        });

    }

    const handleStageMouseMove = (e) => {
        if (!selectionRect.visible) return;

        const pos = e.target.getStage().getPointerPosition();
        if (!pos) return;

        setSelectionRect((prev) => ({
            ...prev,
            width: pos.x - prev.x,
            height: pos.y - prev.y,
        }));
    }

    const handleStageMouseUp = (e) => {
        if (!selectionRect.visible) return;

        const box = {
            x: Math.min(selectionRect.x, selectionRect.x + selectionRect.width),
            y: Math.min(selectionRect.y, selectionRect.y + selectionRect.height),
            width: Math.abs(selectionRect.width),
            height: Math.abs(selectionRect.height),
        };

        if (box.width < 2 || box.height < 2){
            clearSelection();
        } else{
            let foundId = null;
            for (const [id, node] of nodesRef.current) {
                const nodeBox = node.getClientRect();
                if (Konva.Util.haveIntersection(box, nodeBox)) {
                    foundId = id;
                    break;
                }
            }

            if (foundId) selectObject(foundId);
            else clearSelection();
        }

        setSelectionRect((prev) => ({...prev, visible:false}));
    }

    const handleStageDragEnd = (e) => {
        
    }

    const events = {
        onClick : handleStageMouseClick,
        onDragEnd: handleStageDragEnd,
    }

    

    useStageDnd(stageRef);

    return (
        <Stage
            ref={stageRef}
            width={window.innerWidth}
            height={window.innerHeight}
            onMouseDown={handleStageMouseDown}
            onMouseMove={handleStageMouseMove}
            onMouseUp={handleStageMouseUp}
        >
            <Layer listening={false}>
                {selectionRect.visible && (
                    <Rect 
                        x = {selectionRect.x}
                        y = {selectionRect.y}
                        width = {selectionRect.width}
                        height = {selectionRect.height}
                        fill = "rgba(0, 161, 255, 0.1)"
                        stroke = "rgba(0, 161, 255, 0.6)"
                    />
                )}
            </Layer>

            <Layer>
                {/* <GridLayer /> */}
                <ObjectsLayer objects={objects} getRefSetter={getRefSetter} events={events}/>
                <TransformerLayer nodesRef={nodesRef} />
            </Layer>
        </Stage>
    );
}
