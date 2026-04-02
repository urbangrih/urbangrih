import { Circle } from "react-konva";
import { DEFAULT_CORNER_UI_PROPERTIES } from "../../utils/constants";

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
            radius={DEFAULT_CORNER_UI_PROPERTIES.radius}
            fill={DEFAULT_CORNER_UI_PROPERTIES.fill}
            draggable={DEFAULT_CORNER_UI_PROPERTIES.draggable}
            listening={true}
            {...events}

        />
    );
}
