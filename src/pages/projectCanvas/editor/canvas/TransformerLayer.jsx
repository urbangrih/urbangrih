import React from 'react'
import {useRef} from "react";

export default function TransformerLayer() {
  const transformerRef = useRef();


  return (
    <div>
      {/* <Transformer
        ref={transformerRef}
        boundBoxFunc={(oldBox, newBox) => {
          // Limit resize
          if (newBox.width < 5 || newBox.height < 5) {
            return oldBox;
          }
          return newBox;
        }}
      /> */}
    </div>
  )
}
