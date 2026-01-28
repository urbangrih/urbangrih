import React from "react";
import "./project.css";
import { Stage, Layer, Circle } from "react-konva";

export default function Project() {
    const shapeRef = React.useRef(null);
    React.useEffect(() => {
        // it will log `Konva.Circle` instance
        console.log(shapeRef.current);
    });
    return (
        <div className="container">
            <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                    <Circle
                        ref={shapeRef}
                        x={window.innerWidth / 2}
                        y={window.innerHeight / 2}
                        radius={50}
                        fill="red"
                    ></Circle>
                </Layer>
            </Stage>
        </div>
    );
}
