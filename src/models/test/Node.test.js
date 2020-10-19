import Node from "../Node";
import Coordinates from "../Coordinates";
import Force from "../Force";
import Displacement from "../Displacement";
import Support from "../Support";

const node = new Node(
  "fakeId",
  "A",
  new Coordinates(100, 20),
  new Force(10, -20),
  new Support("Pin"),
  new Displacement(0.5, 0.6)
);

test("Will create node instance", () => {
  expect(node.name).toBe("A");
  expect(node._id).toBe("fakeId");
  expect(node.coordinates.x).toBe(100);
  expect(node.coordinates.y).toBe(20);
  expect(node.force.x).toBe(10);
  expect(node.force.y).toBe(-20);
  expect(node.support.x).toBe(1);
  expect(node.displacement.x).toBe(0.5);
  expect(node.displacement.y).toBe(0.6);
});

test("Will create node instance with default values", () => {
  const node = new Node(
    "fakeId",
    "A",
    new Coordinates(),
    new Force(),
    new Support(),
    new Displacement()
  );
  expect(node.name).toBe("A");
  expect(node._id).toBe("fakeId");
  expect(node.coordinates.x).toBe(0);
  expect(node.coordinates.y).toBe(0);
  expect(node.force.x).toBe(0);
  expect(node.force.y).toBe(0);
  expect(node.support.x).toBe(0);
  expect(node.displacement.x).toBe(0);
  expect(node.displacement.y).toBe(0);
});
