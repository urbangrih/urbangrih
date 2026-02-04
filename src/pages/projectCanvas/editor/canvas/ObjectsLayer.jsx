// Renders manually created shapes
import { Line, Rect, Circle } from "react-konva";
import { useEditorStore } from "../state/editorStore";

const RENDERERS = {
    wall: (obj, setNodeRef, events) => (
        <Line
            ref={setNodeRef}
            key={obj.id}
            id={obj.id}
            points={[obj.x1, obj.y1, obj.x2, obj.y2]}
            stroke={obj.stroke ?? "black"}
            strokeWidth={obj.thickness ?? 20}
            lineCap="round"
            {...events}
        />
    ),

    rect: (obj, setNodeRef, events) => (
        <Rect
            ref={setNodeRef}
            key={obj.id}
            id={obj.id}
            x={obj.x}
            y={obj.y}
            width={obj.width}
            height={obj.height}
            rotation={obj.rotation ?? 0}
            fill={obj.fill}
            stroke={obj.stroke}
            strokeWidth={obj.strokeWidth}
            cornerRadius={obj.cornerRadius ?? 0}
            draggable={obj.draggable}
            {...events}
        />
    ),

    circle: (obj, setNodeRef, events) => (
        <Circle
            ref={setNodeRef}
            key={obj.id}
            id={obj.id}
            x={obj.x}
            y={obj.y}
            radius={obj.radius}
            fill={obj.fill}
            stroke={obj.stroke}
            strokeWidth={obj.strokeWidth}
            draggable={obj.draggable}
            {...events}
        />
    ),

    door: (obj, setNodeRef, events) => (
        <Rect
            ref={setNodeRef}
            key={obj.id}
            id={obj.id}
            x={obj.x}
            y={obj.y}
            width={obj.width}
            height={obj.height}
            fill={obj.fill ?? "brown"}
            draggable={obj.draggable}
            {...events}
        />
    ),
};

export default function ObjectsLayer({ objects, getRefSetter, events }) {
    const selectObject = useEditorStore((s) => s.selectObject);

    return objects.map((obj) => {
        const render = RENDERERS[obj.type];
        if (!render) return null;
        // const events = {
        //     onClick : (e) => {
        //         e.cancelBubble = true;
        //         selectObject(objects.id);
        //     }
        // };
        return render(obj, getRefSetter(obj.id), events);
    });
}
