import { Layer, Line } from "react-konva";
import { useEditorStore } from "../../store/editorStore";

export default function GuidesLayer({ guideLayerRef, guides }) {
    // const { guides } = useEditorStore((state) => state.guides);
    const stageWidth = guideLayerRef.current?.getStage().width() || 0;
    const stageHeight = guideLayerRef.current?.getStage().height() || 0;
    return (
        <Layer ref={guideLayerRef} listening={false}>
            {guides.map((guide, index) => {
                if (guide.type === "vertical") {
                    return (
                        <Line
                            key={index}
                            points={[guide.x, 0, guide.x, stageHeight]}
                            stroke="blue"
                            dash={[4, 4]}
                        />
                    );
                }

                if (guide.type === "horizontal") {
                    return (
                        <Line
                            key={index}
                            points={[0, guide.y, stageWidth, guide.y]}
                            stroke="blue"
                            dash={[4, 4]}
                        />
                    );
                }

                return null;
            })}
        </Layer>
    );
}
