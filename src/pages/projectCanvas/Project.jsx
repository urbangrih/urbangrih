import React from "react";
import "./project.css";
import KonvaCanvas from "./editor/canvas/konva-canvas";
import { LeftPanel } from "./editor/panels/left/LeftPanel.jsx";
import { RightPanel } from "./editor/panels/right/RightPanel.jsx";

export default function Project() {
    return (
        <main className="editor" aria-label="Project editor">
            <aside className="left-panel" aria-label="Editor tools">
                <LeftPanel />
            </aside>

            <section className="canvas" aria-label="Canvas workspace">
                <KonvaCanvas />
            </section>

            <aside className="right-panel" aria-label="Properties and shapes">
                <RightPanel />
            </aside>
        </main>
    );
}
