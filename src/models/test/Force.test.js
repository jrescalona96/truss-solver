import Force from "../Force";

const force = new Force(2, 2);
const resultant = Math.sqrt(8);

test("X Force will be 2", () => {
  expect(force.x).toBe(2);
});

test("Y Force will be 2", () => {
  expect(force.y).toBe(2);
});

test("Resultant return resultant", () => {
  expect(force.resultant).toBe(resultant);
});

test("New x force = 10", () => {
  let magnitude = 10;
  force.x = magnitude;
  expect(force.x).toBe(magnitude);
});

test("New y force = 12", () => {
  let magnitude = 10;
  force.y = magnitude;
  expect(force.y).toBe(magnitude);
});

test("New Resulant was calculated", () => {
  let newResultant = Math.sqrt(200);
  expect(force.resultant).toBe(newResultant);
});
