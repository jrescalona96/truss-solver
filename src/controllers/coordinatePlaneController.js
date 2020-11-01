const planeSize = { width: 2000, height: 2000 };
const origin = { x: planeSize.width / 2, y: planeSize.height / 2 };

export const calcRelativeCoord = (x, y) => {
  const xRel = origin.x + x;
  const yRel = planeSize.height - origin.y - y;
  return { xRel, yRel };
};

export const calculatePlaneSize = (nodes) => {
  const viewBox = { width: planeSize.width, height: planeSize.height };
  return { planeSize, viewBox };
};

export const calcLabelPosition = (radius, xRel, yRel) => {
  const x = xRel - radius * 2;
  const y = yRel - radius * 1.5;
  return { x, y };
};
