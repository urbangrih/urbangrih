import { Stage, Layer, Rect } from "react-konva";

import { useRef, useEffect } from "react";
// import { createObject } from "../services/objectFactory";
import ObjectsLayer from "./ObjectsLayer";
import RoomLayer from "./layers/RoomLayer";
import StructureLayer from "./layers/StructureLayer";
// import TransformerLayer from "./TransformerLayer";
import GuidesLayer from "./layers/GuidesLayer";
// import GridLayer from "./GridLayer";

import { useNodeRegistry } from "./hooks/useNodeRegistry";
import { useEditorStore } from "../store/editorStore";
import { createWall, createCorner } from "../services/objectFactory";


import { useStageDnd } from "./hooks/useStageDnd";
import { useRoomDrag } from "../interactions/roomDrag/useRoomDrag";
import { buildRoomDragPreviewTopology } from "../engines/roomEngine/dragPreviewTopology";

import {
    getLineGuideStops,
    drawGuides,
    getGuides,
    getObjectSnappingEdges,
} from "../utils/objectSnap";

export default function CanvasStage() {
    const stageRef = useRef(null);
    const objectLayerRef = useRef(null);
    const guideLayerRef = useRef(null);

    const objects = useEditorStore((s) => s.objects);
    const corners = useEditorStore((s) => s.corners);
    const walls = useEditorStore((s) => s.walls);
    const rooms = useEditorStore((s) => s.rooms);

    const selectObject = useEditorStore((s) => s.selectObject);

    const selectedIds = useEditorStore((s) => s.selectedIds);
    const removeSelection = useEditorStore((s) => s.removeSelection);
    const clearSelection = useEditorStore((s) => s.clearSelection);

    const addCorner = useEditorStore((s) => s.addCorner);

    const addWall = useEditorStore((s) => s.addWall);

    const guides = useEditorStore((s) => s.guides);

    const { nodesRef, getRefSetter } = useNodeRegistry();

    const {
        onRoomDragStart,
        onRoomDragMove,
        onRoomDragEnd,
        invalidRoomId,
        roomDragSession,
    } = useRoomDrag();

    const roomEvents = {
        onDragStart: onRoomDragStart,
        onDragMove: onRoomDragMove,
        onDragEnd: onRoomDragEnd,
    };

    const { previewCorners, previewWalls, previewRooms } =
        buildRoomDragPreviewTopology(corners, walls, rooms, roomDragSession);


    useEffect(() => {
        const c1 = createCorner(500, 100);
        const c2 = createCorner(500, 200);
        addCorner(c1);
        addCorner(c2);
        const w1 = createWall(c1.id, c2.id);
        addWall(w1);
    }, []);

    const handleStageMouseClick = (e) => {
        e.cancelBubble = true;

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

    const handleObjectDragMove = (e) => {
        // const id = e.target.id();
        const node = e.target;

        const layer = node.getLayer();
        layer.find(".guid-line").forEach((line) => line.destroy());
        layer.batchDraw();

        let lineGuideStops = getLineGuideStops(node, stageRef.current);
        let itemBounds = getObjectSnappingEdges(node);

        let guides = getGuides(lineGuideStops, itemBounds);

        if (!guides.length) {
            return;
        }

        drawGuides(guides, objectLayerRef.current);

        let absPos = node.absolutePosition();
        // now force object position
        guides.forEach((lg) => {
            switch (lg.orientation) {
                case "V": {
                    absPos.x = lg.lineGuide + lg.offset;
                    break;
                }
                case "H": {
                    absPos.y = lg.lineGuide + lg.offset;
                    break;
                }
            }
        });
        node.absolutePosition(absPos);
    };

    const handleStageDragEnd = (e) => {
        const node = e.target;

        const layer = node.getLayer();
        layer.find(".guid-line").forEach((line) => line.destroy());
        layer.batchDraw();
    };

    const events = {
        onClick: handleStageMouseClick,
        onDragMove: handleObjectDragMove,
        onDragEnd: handleStageDragEnd,
    };

    useStageDnd(stageRef);

    return (
        <Stage
            ref={stageRef}
            width={window.innerWidth}
            height={window.innerHeight}
            // draggable
        >
            <GuidesLayer
                guideLayerRef={guideLayerRef}
                guides={guides} // we will pass guides here later
            />
            <RoomLayer
                corners={previewCorners}
                rooms={previewRooms}
                roomEvents={roomEvents}
                invalidRoomId={invalidRoomId}
            />
            <StructureLayer
                corners={previewCorners}
                walls={previewWalls}
            />
            <Layer ref={objectLayerRef}>
                {/* <GridLayer /> */}
                <ObjectsLayer
                    objects={objects}
                    getRefSetter={getRefSetter}
                    events={events}
                />
                {/* <TransformerLayer nodesRef={nodesRef} /> */}
            </Layer>
        </Stage>
    );
}
