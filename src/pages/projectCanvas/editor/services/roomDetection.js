import { computeSignedArea } from "./geometry";
import { sortOutgoingEdgesByAngle } from "./halfEdgeBuilder";

function edgeKey(edge) {
	return `${edge.from}->${edge.to}`;
}

function buildCornerMap(corners) {
	const cornerById = new Map();
	for (const corner of corners || []) {
		cornerById.set(corner.id, corner);
	}
	return cornerById;
}


export function computeRoomCentroid(face, corners) {
	const cornerById = buildCornerMap(corners);
	const cornerIds = Array.isArray(face) ? face : face.cornerIds;
	if (!cornerIds || cornerIds.length < 3) {
		return null;
	}

	const points = cornerIds
		.map((cornerId) => cornerById.get(cornerId))
		.filter(Boolean);

	if (points.length < 3) {
		return null;
	}

	let areaAccumulator = 0;
	let centroidX = 0;
	let centroidY = 0;

	for (let i = 0; i < points.length; i += 1) {
		const current = points[i];
		const next = points[(i + 1) % points.length];
		const cross = current.x * next.y - next.x * current.y;
		areaAccumulator += cross;
		centroidX += (current.x + next.x) * cross;
		centroidY += (current.y + next.y) * cross;
	}

	const area = areaAccumulator / 2;
	if (area === 0) {
		return null;
	}

	return {
		x: centroidX / (6 * area),
		y: centroidY / (6 * area),
	};
}

function getNextEdge(currentEdge, directedGraph) {
	const outgoing = directedGraph.get(currentEdge.to) || [];
	if (outgoing.length === 0) {
		return null;
	}

	const reverseIndex = outgoing.findIndex(
		(edge) => edge.to === currentEdge.from
	);

	if (reverseIndex === -1) {
		return null;
	}

	const nextIndex =
		(reverseIndex - 1 + outgoing.length) % outgoing.length;
	return outgoing[nextIndex] || null;
}

export function computeFaceArea(face, corners) {
	const cornerById = buildCornerMap(corners);
	const cornerIds = Array.isArray(face) ? face : face.cornerIds;
	if (!cornerIds || cornerIds.length < 3) {
		return 0;
	}

	const points = cornerIds
		.map((cornerId) => cornerById.get(cornerId))
		.filter(Boolean);

	if (points.length < 3) {
		return 0;
	}

	// return Math.abs(computeSignedArea(points));
	return computeSignedArea(points);
}

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
				// console.log("Detected a face", faces);
			}
		}
	}

	return faces;
}

export function removeOuterFace(faces) {
	if (!faces || faces.length === 0) {
		return [];
	}
	
	const finalRooms = faces.filter((face) => (face.area < 0));

	return finalRooms;
}
