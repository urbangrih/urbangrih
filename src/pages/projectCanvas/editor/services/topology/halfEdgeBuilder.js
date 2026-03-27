import { getAngle } from "../geometry/angle";

export function buildDirectedGraph(corners, walls) {
    const directedGraph = new Map();
    const cornerById = new Map();

    for (const corner of corners || []) {
        cornerById.set(corner.id, corner);
        directedGraph.set(corner.id, []);
    }

    for (const wall of walls || []) {
        const startCorner = cornerById.get(wall.startCornerId);
        const endCorner = cornerById.get(wall.endCornerId);

        if (!startCorner || !endCorner) {
            continue;
        }

        const forwardAngle = getAngle(startCorner, endCorner);
        const backwardAngle = getAngle(endCorner, startCorner);

        directedGraph.get(startCorner.id).push({
            from: startCorner.id,
            to: endCorner.id,
            wallId: wall.id,
            angle: forwardAngle,
        });

        directedGraph.get(endCorner.id).push({
            from: endCorner.id,
            to: startCorner.id,
            wallId: wall.id,
            angle: backwardAngle,
        });
    }

    return directedGraph;
}

export function sortOutgoingEdgesByAngle(directedGraph) {
    const sorted = new Map();
    const fullTurn = Math.PI * 2;

    for (const [cornerId, edges] of directedGraph.entries()) {
        const ordered = [...edges].sort((a, b) => {
            const angleA = (fullTurn - a.angle) % fullTurn;
            const angleB = (fullTurn - b.angle) % fullTurn;

            if (angleA === angleB) {
                if (a.to === b.to) {
                    return 0;
                }
                return String(a.to).localeCompare(String(b.to));
            }
            return angleA - angleB;
        });
        sorted.set(cornerId, ordered);
    }

    return sorted;
}
