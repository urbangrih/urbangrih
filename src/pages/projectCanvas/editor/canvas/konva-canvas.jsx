import React from "react";
import { Stage, Layer, Circle } from "react-konva";

export default function KonvaCanvas() {
    const shapeRef = React.useRef(null);
    React.useEffect(() => {
        // it will log `Konva.Circle` instance
        console.log(shapeRef.current);
    });
    return (
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
    );
}
