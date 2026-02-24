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

function rotateArray(values, startIndex) {
	if (values.length === 0) {
		return [];
	}
	return [...values.slice(startIndex), ...values.slice(0, startIndex)];
}

function compareIdSequences(a, b) {
	const length = Math.min(a.length, b.length);
	for (let i = 0; i < length; i += 1) {
		if (a[i] < b[i]) return -1;
		if (a[i] > b[i]) return 1;
	}
	return a.length - b.length;
}

function normalizeCornerCycle(cornerIds) {
	if (!cornerIds || cornerIds.length === 0) {
		return [];
	}

	const ids = cornerIds.slice();
	const minId = ids.reduce((min, id) => (id < min ? id : min), ids[0]);
	const minIndices = [];
	for (let i = 0; i < ids.length; i += 1) {
		if (ids[i] === minId) {
			minIndices.push(i);
		}
	}

	let best = null;
	for (const index of minIndices) {
		const rotated = rotateArray(ids, index);
		if (!best || compareIdSequences(rotated, best) < 0) {
			best = rotated;
		}
	}

	const reversed = ids.slice().reverse();
	const minIdReversed = reversed.reduce(
		(min, id) => (id < min ? id : min),
		reversed[0],
	);
	const minIndicesReversed = [];
	for (let i = 0; i < reversed.length; i += 1) {
		if (reversed[i] === minIdReversed) {
			minIndicesReversed.push(i);
		}
	}

	for (const index of minIndicesReversed) {
		const rotated = rotateArray(reversed, index);
		if (!best || compareIdSequences(rotated, best) < 0) {
			best = rotated;
		}
	}

	return best || ids;
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
				const normalizedCornerIds = normalizeCornerCycle(cornerIds);
				const roomId = "room-" + normalizedCornerIds.join("-");
				const centroid = computeRoomCentroid({ cornerIds }, corners);
				faces.push({
					roomId,
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
