const origin = { x: 50, y: 50 };
const planeSize = { width: 1000, height: 600 };

export const calcRelativeCoord = (x, y) => {
  const xRel = origin.x + x;
  const yRel = planeSize.height - origin.y - y;
  return { xRel, yRel };
};

export const calculatePlaneSize = (nodes) => {
  const defaultWidth = window.innerWidth * 0.8;
  const defaultHeight = window.innerHeight * 0.95;
  const maxX = Math.max(...nodes.map((item) => item.xCoord));
  const maxY = Math.max(...nodes.map((item) => item.yCoord));
  const width = maxX >= defaultWidth ? maxX + origin.x : defaultWidth;
  const height = maxY >= defaultHeight ? maxY + origin.y : defaultHeight;
  planeSize.width = width;
  planeSize.height = height;
  return planeSize;
};

export const calcLabelPosition = (data, radius, xRel, yRel) => {
  const x = xRel - radius * 2;
  const y = yRel - radius * 1.5;
  return { x, y };
};
