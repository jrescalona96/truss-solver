const ORIGIN = { x: 25, y: 25 };
export const COORD_PLANE_SIZE_X = 1000;
export const COORD_PLANE_SIZE_Y = 600;

export const calcRelativeCoord = (data) => {
  const { x, y } = data;
  const relX = ORIGIN.x + x;
  const relY = COORD_PLANE_SIZE_Y - ORIGIN.y - y;
  return { relX, relY };
};
