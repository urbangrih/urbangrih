import { useRef, useEffect } from "react";
import { Transformer } from "react-konva";
import { useEditorStore } from "../state/editorStore";

// import { useNodeRegistry } from './hooks/useNodeRegistry';

export default function TransformerLayer({ nodesRef }) {
    const transformerRef = useRef();
    // const objects = useEditorStore((s) => s.objects);
    const selectedIds = useEditorStore((s) => s.selectedIds);
    const updateObject = useEditorStore((s) => s.updateObject);

    useEffect(() => {
        if (!transformerRef.current) return;

        if (selectedIds) {
            const nodes = selectedIds.map(id => nodesRef.current.get(id))
            console.log(nodes);
            transformerRef.current.nodes(nodes ? nodes : []);
        } else {
            transformerRef.current.nodes([]);
        }
    }, [selectedIds, nodesRef]);

    const handleTransformEnd = (e) => {
            const id = e.target.id();
            const node = e.target;

            const scaleX = node.scaleX();
            const scaleY = node.scaleY();
    
            node.scaleX(1);
            node.scaleY(1);
    
            updateObject(id, {
                x: node.x(),
                y: node.y(),
                width: Math.max(5, node.width() * scaleX),
                height: Math.max(5, node.height() * scaleY),
                rotation: node.rotation(),
            });
    }

    return (
        <Transformer
            ref={transformerRef}
            onTransformEnd={handleTransformEnd}
            boundBoxFunc={(oldBox, newBox) => {
                // Limit resize
                if (newBox.width < 5 || newBox.height < 5) {
                    return oldBox;
                }
                return newBox;
            }}
        />
    );
}
