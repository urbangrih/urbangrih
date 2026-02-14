import React from "react";

export function LeftPanel() {
    const SHAPES = [
        { type: "rect", label: "Rectangle" },
        { type: "circle", label: "Circle" },
        { type: "wall", label: "Wall" },
    ];
    const onDragStart = (e, item) => {
        e.dataTransfer.setData(
            "application/x-editor-item",
            JSON.stringify(item)
        );
        e.dataTransfer.effectAllowed = "copy";
    };
    return (
        <div className="left-pane">
            {SHAPES.map((item, index) => (
                <div
                    key={item.type}
                    className={`shape-${item.type}`}
                    draggable
                    onDragStart={(e) => onDragStart(e, item)}
                >
                    {item.label}
                </div>
            ))}
        </div>
    );
}
