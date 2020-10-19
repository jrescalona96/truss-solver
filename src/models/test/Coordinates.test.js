import Coordinates from "../Force";

const coordinates = new Coordinates(2, 2);
const resultant = Math.sqrt(8);

test("X Coordinate will be 2", () => {
  expect(coordinates.x).toBe(2);
});

test("Y Coordinate will be 2", () => {
  expect(coordinates.y).toBe(2);
});

test("Resultant return resultant", () => {
  expect(coordinates.resultant).toBe(resultant);
});

test("New x coord = 10", () => {
  let magnitude = 10;
  coordinates.x = magnitude;
  expect(coordinates.x).toBe(magnitude);
});

test("New y coord = 12", () => {
  let magnitude = 10;
  coordinates.y = magnitude;
  expect(coordinates.y).toBe(magnitude);
});

test("New Resulant was calculated", () => {
  let newResultant = Math.sqrt(200);
  expect(coordinates.resultant).toBe(newResultant);
});
