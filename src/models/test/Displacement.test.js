import Displacement from "../Displacement";

const displacement = new Displacement(2, 2);
const resultant = Math.sqrt(8);

test("X Force will be 2", () => {
  expect(displacement.x).toBe(2);
});

test("Y Displacement will be 2", () => {
  expect(displacement.y).toBe(2);
});

test("Resultant return resultant", () => {
  expect(displacement.resultant).toBe(resultant);
});

test("New x displacement = 10", () => {
  let magnitude = 10;
  displacement.x = magnitude;
  expect(displacement.x).toBe(magnitude);
});

test("New y displacement = 12", () => {
  let magnitude = 10;
  displacement.y = magnitude;
  expect(displacement.y).toBe(magnitude);
});

test("New Resulant was calculated", () => {
  let newResultant = Math.sqrt(200);
  expect(displacement.resultant).toBe(newResultant);
});
