import { Stage, Layer, Rect } from "react-konva";

import Konva from "konva";

import { useRef, useState, useEffect } from "react";
// import { createObject } from "../services/objectFactory";
import ObjectsLayer from "./ObjectsLayer";
import RoomLayer from "./layers/RoomLayer";
import StructureLayer from "./layers/StructureLayer";
import TransformerLayer from "./TransformerLayer";
import GuidesLayer from "./layers/GuidesLayer";
// import GridLayer from "./GridLayer";

import { useNodeRegistry } from "./hooks/useNodeRegistry";
import { useEditorStore } from "../state/editorStore";
import { createWall, createCorner } from "../services/objectFactory";

import {
    attemptRoomMove,
    validateRoomMove,
} from "../services/roomDragEngine";

import { useStageDnd } from "./hooks/useStageDnd";
import {
    getSnappedCornerPosition,
    detectOverlappingCorners,
} from "../services/snapEngine";
import {
    getLineGuideStops,
    drawGuides,
    getGuides,
    getObjectSnappingEdges,
} from "../utils/objectSnap";
import {
    isPlacementValid,
    isWallOverlapping,
} from "../services/wallValidation";

export default function CanvasStage() {
    const stageRef = useRef(null);
    const objectLayerRef = useRef(null);
    const guideLayerRef = useRef(null);

    const objects = useEditorStore((s) => s.objects);
    const corners = useEditorStore((s) => s.corners);
    const walls = useEditorStore((s) => s.walls);

    const selectObject = useEditorStore((s) => s.selectObject);
    const addObject = useEditorStore((s) => s.addObject);
    const updateObject = useEditorStore((s) => s.updateObject);

    const selectedIds = useEditorStore((s) => s.selectedIds);
    const removeSelection = useEditorStore((s) => s.removeSelection);
    const clearSelection = useEditorStore((s) => s.clearSelection);

    const addCorner = useEditorStore((s) => s.addCorner);
    const moveCorner = useEditorStore((s) => s.moveCorner);
    const moveCornersBatch = useEditorStore((s) => s.moveCornersBatch);
    const mergeCorners = useEditorStore((s) => s.mergeCorners);

    const addWall = useEditorStore((s) => s.addWall);
    const cleanupWalls = useEditorStore((s) => s.cleanupWalls);

    const guides = useEditorStore((s) => s.guides);
    const setGuides = useEditorStore((s) => s.setGuides);
    const clearGuides = useEditorStore((s) => s.clearGuides);

    const rooms = useEditorStore((s) => s.rooms);
    const recomputeRooms = useEditorStore((s) => s.recomputeRooms);

    const { nodesRef, getRefSetter } = useNodeRegistry();

    const [draggingWallCorners, setDraggingWallCorners] = useState(null);
    const [invalidRoomId, setInvalidRoomId] = useState(null);

    // const [selectionRect, setSelectionRect] = useState({
    //     visible: false,
    //     x: 0,
    //     y: 0,
    //     width: 0,
    //     height: 0,
    // });

    //temporary
    useEffect(() => {
        recomputeRooms();
    }, []);

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

    function attemptMoveCorners(cornersToMove, dx, dy) {
        const tempCorners = corners.map((corner) => {
            const toMove = cornersToMove.find((c) => c.id === corner.id);
            if (toMove) {
                return { ...corner, x: toMove.x + dx, y: toMove.y + dy };
            }
            return corner;
        });
        const wallsToCheck = walls.filter((w) =>
            cornersToMove.some(
                (c) => c.id === w.startCornerId || c.id === w.endCornerId,
            ),
        );

        // console.log("Attempting to move corners", { "corners:": corners, "tempCorners:": tempCorners, "cornersToMove": cornersToMove });

        let isDragValid = false;
        let isOverlapping = false;
        console.log("Checking walls for validity", wallsToCheck);
        for (let wall of wallsToCheck) {
            isDragValid = isPlacementValid(
                wall,
                walls.filter((w) => w.id !== wall.id),
                tempCorners,
            );
            console.log("isPlacementValid for wall ", wall.id, ":", isDragValid);
            if (!isDragValid) {
                isOverlapping = isWallOverlapping(
                    wall,
                    walls.filter((w) => w.id !== wall.id),
                    tempCorners,
                );
                break;
            }
        }

        if (isDragValid && !isOverlapping) {
            return {
                success: true,
                reason: null,
                tempCorners,
            };
        }

        return {
            success: false,
            reason: isOverlapping ? "overlap" : "invalid",
            tempCorners,
        };
    }

    const handleCornerDragStart = (e) => {
        const node = e.target;
        setDraggingCorner({
            id: node.attrs.id,
            x: node.x(),
            y: node.y(),
        });
    };

    const handleCornerDragMove = (e) => {
        const node = e.target;

        const newX = node.attrs.x;
        const newY = node.attrs.y;

        const { x, y, guides } = getSnappedCornerPosition(
            node.attrs.id,
            { x: newX, y: newY },
            corners,
        );
        e.target.position({ x, y });

        setDraggingCorner((prev) =>
            prev && prev.id === node.attrs.id ? { ...prev, x, y } : prev,
        );

        // const validPlacement = attemptMoveCorners([{id: node.attrs.id, x, y}], dx, dy);

        setGuides(guides);
    };

    const handleCornerDragEnd = (e) => {
        clearGuides();
        const node = e.target;

        const { success, reason, tempCorners } = attemptMoveCorners(
            [{ id: node.attrs.id, x: node.x(), y: node.y() }],
            0,
            0,
        );
        console.log("Corner drag end", { success, reason });
        if (
            !success &&
            reason !== "overlap" &&
            draggingCorner &&
            draggingCorner.id === node.attrs.id
        ) {
            const originalCornerPosition = corners.find(
                (c) => c.id === node.attrs.id,
            );
            node.position({
                x: originalCornerPosition.x,
                y: originalCornerPosition.y,
            });
            setDraggingCorner(null);
            return;
        }

        const overlappingNodeId = detectOverlappingCorners(
            node.attrs.id,
            { x: node.x(), y: node.y() },
            tempCorners,
        );
        moveCorner(node.attrs.id, node.x(), node.y());
        if (overlappingNodeId) {
            mergeCorners(overlappingNodeId, node.attrs.id);
            cleanupWalls();
        }
        console.log("corners after drag", corners);
        setDraggingCorner(null);
        recomputeRooms();
    };

    const handleWallDragStart = (e) => {
        const draggedWall = e.target;
    };
    const handleWallDragMove = (e) => {};
    const handleWallDragEnd = (e) => {
        const draggedWall = e.target;
        const draggedWallId = draggedWall.attrs.id;
        const draggedWallObject = walls.find((w) => w.id === draggedWallId);
        const startCornerId = draggedWallObject.startCornerId;
        const endCornerId = draggedWallObject.endCornerId;
        const wallCorners = [startCornerId, endCornerId]
            .map((id) => corners.find((c) => c.id === id))
            .filter(Boolean);

        if (wallCorners.length !== 2) {
            draggedWall.position({ x: 0, y: 0 });
            return;
        }

        const deltaX = draggedWall.attrs.x;
        const deltaY = draggedWall.attrs.y;

        const { success, reason, tempCorners } = attemptMoveCorners(
            wallCorners,
            deltaX,
            deltaY,
        );
        // if (!success && reason !== "overlap") {
        if (!success) {
            const originalCornerPositions = wallCorners.map((c) =>
                corners.find((corner) => corner.id === c.id),
            );
            draggedWall.points([
                originalCornerPositions[0].x,
                originalCornerPositions[0].y,
                originalCornerPositions[1].x,
                originalCornerPositions[1].y,
            ]);
            draggedWall.position({ x: 0, y: 0 });
            return;
        }

        const newX_1 = wallCorners[0].x + deltaX;
        const newY_1 = wallCorners[0].y + deltaY;
        const newX_2 = wallCorners[1].x + deltaX;
        const newY_2 = wallCorners[1].y + deltaY;

        const updatedCorners = [
            { id: wallCorners[0].id, x: newX_1, y: newY_1 },
            { id: wallCorners[1].id, x: newX_2, y: newY_2 },
        ];
        moveCornersBatch(updatedCorners);

        draggedWall.position({ x: 0, y: 0 });

        recomputeRooms();
    };

    function handleRoomDragStart(e) {
        const room = e.target;
        const roomId = room.attrs.id;
        if (!roomId) {
            return;
        }
        setInvalidRoomId(null);
    }

    function handleRoomDragMove(e) {
        const room = e.target;
        const roomId = room.attrs.id;
        if (!roomId) {
            return;
        }

        const deltaX = room.x();
        const deltaY = room.y();

        const { success } = validateRoomMove(
            roomId,
            deltaX,
            deltaY,
            rooms,
            walls,
            corners,
        );

        setInvalidRoomId(success ? null : roomId);
    }

    function handleRoomDragEnd(e) {
        const room = e.target;
        const roomId = room.attrs.id;
        if (!roomId) {
            room.position({ x: 0, y: 0 });
            return;
        }
        setInvalidRoomId(null);

        const deltaX = room.x();
        const deltaY = room.y();

        const { success, roomCorners } = attemptRoomMove(
            roomId,
            deltaX,
            deltaY,
            rooms,
            walls,
            corners,
        );

        if (!success || !roomCorners?.length) {
            room.position({ x: 0, y: 0 });
            return;
        }

        const updatedCorners = roomCorners.map((corner) => ({
            id: corner.id,
            x: corner.x + deltaX,
            y: corner.y + deltaY,
        }));
        moveCornersBatch(updatedCorners);
        room.position({ x: 0, y: 0 });
        recomputeRooms();
    }

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
                invalidRoomId={invalidRoomId}
            />
            <StructureLayer
                draggingCorner={draggingCorner}
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
