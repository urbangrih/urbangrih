export const selectCorners = state => state.corners;

export const selectWalls = state => state.walls;

export const selectRooms = state => state.rooms;

export const selectGuides = state => state.ui.guides;

export const selectCornerById = (id) =>
    (state) => state.corners.find(c => c.id === id);

export const selectConnectedWalls = (cornerId) =>
    (state) => state.walls.filter(
        wall =>
            wall.startCornerId === cornerId ||
            wall.endCornerId === cornerId
    );