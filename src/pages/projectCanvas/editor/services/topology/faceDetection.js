import { sortOutgoingEdgesByAngle } from "./halfEdgeBuilder";
import { computeFaceArea } from "../geometry/polygon";
import { computeRoomCentroid } from "./roomGraph";

export function detectFaces(directedGraph, corners) {
    const orderedGraph = sortOutgoingEdgesByAngle(directedGraph);
    const visited = new Set();
    const faces = [];

    for (const edges of orderedGraph.values()) {
        for (const startEdge of edges) {
            const startKey = edgeKey(startEdge);
            if (visited.has(startKey)) {
                continue;
            }

            const cornerIds = [];
            let edge = startEdge;
            let guard = 0;
            const maxSteps = orderedGraph.size * 10 + 10;

            while (edge && guard < maxSteps) {
                const key = edgeKey(edge);
                if (visited.has(key)) {
                    break;
                }
                visited.add(key);

                if (cornerIds.length === 0) {
                    cornerIds.push(edge.from);
                }
                cornerIds.push(edge.to);

                edge = getNextEdge(edge, orderedGraph);
                if (!edge) {
                    break;
                }
                if (edge.from === startEdge.from && edge.to === startEdge.to) {
                    break;
                }
                guard += 1;
            }

            if (cornerIds.length >= 3 && cornerIds[0] === cornerIds.at(-1)) {
                cornerIds.pop();
            }

            if (cornerIds.length >= 3) {
                const area = computeFaceArea({ cornerIds }, corners);
                if (Math.abs(area) < 1e-6) {
                    continue;
                }
                const centroid = computeRoomCentroid({ cornerIds }, corners);
                faces.push({
                    cornerIds,
                    area,
                    centroid,
                });
            }
        }
    }
    return faces;
}

export function removeOuterFace(faces) {
    if (!faces || faces.length === 0) {
        return [];
    }

    const finalRooms = faces.filter((face) => face.area < 0);

    return finalRooms;
}

function getNextEdge(currentEdge, directedGraph) {
    const outgoing = directedGraph.get(currentEdge.to) || [];
    if (outgoing.length === 0) {
        return null;
    }

    const reverseIndex = outgoing.findIndex(
        (edge) => edge.to === currentEdge.from,
    );

    if (reverseIndex === -1) {
        return null;
    }

    const nextIndex = (reverseIndex - 1 + outgoing.length) % outgoing.length;
    return outgoing[nextIndex] || null;
}

function edgeKey(edge) {
    return `${edge.from}->${edge.to}`;
}
