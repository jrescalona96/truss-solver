import * as d3 from "d3";

const ORIGIN = { x: 50, y: 50 };
let COORD_PLANE_SIZE_X = 1000;
let COORD_PLANE_SIZE_Y = 600;

export const calcRelativeCoord = (x, y) => {
  const xRel = ORIGIN.x + x;
  const yRel = COORD_PLANE_SIZE_Y - ORIGIN.y - y;
  return { xRel, yRel };
};

// TODO: need to reimplement this
export const calculatePlaneSize = (nodes) => {
  const defaultWidth = window.innerWidth * 0.8;
  const defaultHeight = window.innerHeight * 0.95;
  const maxX = Math.max(...nodes.map((item) => item.xCoord));
  const maxY = Math.max(...nodes.map((item) => item.yCoord));
  const width = maxX >= defaultWidth ? maxX + ORIGIN.x : defaultWidth;
  const height = maxY >= defaultHeight ? maxY + ORIGIN.y : defaultHeight;
  COORD_PLANE_SIZE_X = width;
  COORD_PLANE_SIZE_Y = height;
  return { width, height };
};

export const getScales = (data) => {
  // find max
  const domainData = data.map((item) => item.xCoord);
  const ordinalData = data.map((item) => item.yCoord);
  const maxDomain = data.length === 1 ? COORD_PLANE_SIZE_X : d3.max(domainData);
  const maxOrdinal =
    data.length === 1 ? COORD_PLANE_SIZE_Y : d3.max(ordinalData);

  const xScale = d3
    .scaleLinear()
    .domain([0, maxDomain])
    .range(0, COORD_PLANE_SIZE_X);

  const yScale = d3
    .scaleLinear()
    .domain([0, maxOrdinal])
    .range([COORD_PLANE_SIZE_Y, 0]);

  return { yScale, xScale };
};
