# Floor Plan Editor – Folder Structure & Architecture

This project follows a **CAD-style, decoupled architecture** where application state is separated from canvas rendering. Konva is treated as a view layer, not the source of truth.

---

## Root Level

editor/
├── panels/
├── canvas/
├── state/
├── services/
├── EditorLayout.jsx
└── index.jsx


---

## `index.jsx`

**Role:** Application entry point  
- Mounts the React app
- Wraps global providers if needed
- Loads `EditorLayout`

This file contains **no editor logic**.

---

## `EditorLayout.jsx`

**Role:** Application shell  
- Defines the main layout (left panel, canvas, right panel)
- Responsible for high-level UI composition
- Does NOT contain canvas or Konva logic

Think of this as the “window frame” of the editor.

---

## `panels/` – UI Controls (Non-Canvas)

UI panels never talk directly to Konva nodes.  
They communicate **only through the state layer**.

### `panels/left/`

#### `LeftPanel.jsx`
- Container for all left-side tools
- Layout-only component

#### `Palette.jsx`
- Source of draggable DOM items (walls, furniture, etc.)
- Initiates drag → canvas drop flow
- Does not create Konva nodes directly

#### `ToolButtons.jsx`
- Mode switches (select, draw wall, pan, delete)
- Updates editor state (active tool)

---

### `panels/right/`

#### `RightPanel.jsx`
- Container for property-related UI

#### `PropertiesPanel.jsx`
- Displays properties of the currently selected object
- Reads from `editorStore`
- Writes updates back to store (never to Konva directly)

#### `LayersPanel.jsx`
- Shows logical layers / objects
- Controls visibility & locking via state

---

## `state/` – The Brain (Source of Truth)

### `editorStore.js`

**Role:** Central reactive state (Zustand)

Contains:
- All semantic object data (walls, rooms, furniture)
- Selection state (`selectedId`)
- Tool state
- Actions to mutate data

**Critical rule:**
> Konva nodes must never be treated as the source of truth.

---

## `services/` – Object Creation & Business Logic

### `objectFactory.js`

**Role:**
- Creates semantic objects (not Konva shapes)
- Converts drop events or tools into data structures
- Keeps creation logic out of UI and canvas code

This allows clean serialization and future backend sync.

---

## `canvas/` – Konva View Layer

This folder is responsible only for **rendering and interaction**, not data ownership.

### `CanvasStage.jsx`

**Role:**
- Owns the `<Stage>`
- Creates and shares refs to Konva nodes
- Assembles all canvas layers in strict order

Acts as the **orchestrator** of canvas rendering.

---

### `GridLayer.jsx`

**Role:**
- Renders background grid
- Fully static
- Uses `listening={false}` for performance

Never interacts with selection or tools.

---

### `ObjectsLayer.jsx`

**Role:**
- Renders dynamic objects (shapes, furniture, etc.)
- Binds Konva nodes to semantic data from the store
- Registers node refs for external control (Transformer)

Handles:
- Click → selection
- Drag → position updates

---

### `TransformerLayer.jsx` ✅ (New File)

**Role:** Singleton selection transformer

- Contains exactly ONE `<Transformer>`
- Attaches to the currently selected Konva node
- Listens to `selectedId` from the store
- On transform end, writes updated dimensions back to state

**Why separate file?**
- Keeps interaction logic isolated
- Prevents multiple transformers
- Maintains clean layering
- Enables CAD-like extensibility (walls, constraints, snapping)

This layer is **view-only** and has no business logic.

---

## `canvas/index.js`

Optional barrel file for clean imports.

---

## Architectural Summary

- **State drives the canvas**
- **Canvas never owns data**
- **Transformer is singleton and view-only**
- **UI panels never touch Konva directly**
- **Everything is serializable**

This structure scales to:
- Graph-based walls
- Room detection
- Constraints and snapping
- Undo/redo
- Multi-selection

And it reads as **senior-level frontend architecture**.

---
