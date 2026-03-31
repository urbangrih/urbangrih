import { Circle } from "react-konva";

// const RENDERERS = {
//     corner: (obj, events) => (
//         <Circle
//             // ref={setNodeRef}
//             key={obj.id}
//             name="object"
//             id={obj.id}
//             dataType={obj.type}
//             x={obj.x}
//             y={obj.y}
//             radius={obj.radius}
//             fill={obj.fill}
//             draggable={obj.draggable}
//             listening={true}
//             {...events}
//         />
//     ),

//     wall: (obj, corners, draggingCorner, wallEvents) => {
        

        
//     },
// };

export function cornerNode({cornerObj, events}) {
    return (
        <Circle
            key={cornerObj.id}
            name="object"
            id={cornerObj.id}
            dataType={cornerObj.type}
            x={cornerObj.x}
            y={cornerObj.y}
            radius={cornerObj.radius}
            fill={cornerObj.fill}
            draggable={cornerObj.draggable}
            listening={true}
            {...events}
        />
    );
}
