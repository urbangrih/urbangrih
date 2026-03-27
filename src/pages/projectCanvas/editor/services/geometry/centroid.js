export function computeCentroid(points) {
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