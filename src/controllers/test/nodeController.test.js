import * as controller from "../nodeController";
import Node from "../../models/Node";
import Coordinates from "../../models/Coordinates";
import Force from "../../models/Force";
import Support from "../../models/Support";
import Displacement from "../../models/Displacement";

test("Testing _generateId() should have 10 chars", () => {
  const length = controller._generateId().length;
  expect(length).toBe(10);
});

test("generateName() shoud return 'A'", () => {
  expect(controller._generateName([])).toBe("A");
  expect(controller._generateName()).toBe("A");
});

test("createNode() should return a node", () => {
  const data = {
    _id: controller._generateId(),
    name: controller._generateName(),
    xCoord: 0,
    yCoord: 0,
    xForce: 10,
    yForce: -10,
    support: "Pin",
    xDisplacement: -10,
    yDisplacement: -14,
  };
  const node = controller.createNode(data);
  expect(node).toBeDefined();
});

test("createNode() should return null, xCoord is String", () => {
  const data = {
    _id: controller._generateId(),
    name: controller._generateName(),
    xCoord: "string",
    yCoord: 0,
    xForce: 10,
    yForce: -10,
    support: "Pin",
    xDisplacement: -10,
    yDisplacement: -14,
  };

  const node = controller.createNode(data);
  expect(node).toBeNull();
});
test("createNode() should return null yCoord is String", () => {
  const data = {
    _id: controller._generateId(),
    name: controller._generateName(),
    xCoord: 0,
    yCoord: "string",
    xForce: 10,
    yForce: -10,
    support: "Pin",
    xDisplacement: -10,
    yDisplacement: -14,
  };
  const node = controller.createNode(data);
  expect(node).toBeNull();
});
test("createNode() should return null", () => {
  const data = {
    _id: controller._generateId(),
    name: controller._generateName(),
    xCoord: 0,
    yCoord: 0,
    xForce: "string",
    yForce: -10,
    support: "Pin",
    xDisplacement: -10,
    yDisplacement: -14,
  };
  const node = controller.createNode(data);
  expect(node).toBeNull();
});
test("createNode() should return null", () => {
  const data = {
    _id: controller._generateId(),
    name: controller._generateName(),
    xCoord: 0,
    yCoord: 0,
    xForce: 0,
    yForce: "string",
    support: "Pin",
    xDisplacement: -10,
    yDisplacement: -14,
  };
  const node = controller.createNode(data);
  expect(node).toBeNull();
});

test("updateForce on existing nodes should succeed", () => {
  const newForces = {
    node1: { x: 5, y: 10 },
    node2: { x: 20, y: 30 },
    node3: { x: -5, y: -10 },
  };

  const existingNodes = [
    new Node(
      "node1",
      "A",
      new Coordinates(),
      new Force(),
      new Support("Pin"),
      new Displacement()
    ),
    new Node(
      "node2",
      "B",
      new Coordinates(),
      new Force(),
      new Support(),
      new Displacement()
    ),
    new Node(
      "node3",
      "C",
      new Coordinates(),
      new Force(),
      new Support("Pin"),
      new Displacement()
    ),
  ];

  const updatedNodes = controller.updateForce(newForces, existingNodes);
  expect(updatedNodes).toContainEqual(
    new Node(
      "node1",
      "A",
      new Coordinates(),
      new Force(5, 10),
      new Support("Pin"),
      new Displacement()
    )
  );
  expect(updatedNodes).toContainEqual(
    new Node(
      "node2",
      "B",
      new Coordinates(),
      new Force(20, 30),
      new Support(),
      new Displacement()
    )
  );
  expect(updatedNodes).toContainEqual(
    new Node(
      "node3",
      "C",
      new Coordinates(),
      new Force(-5, -10),
      new Support("Pin"),
      new Displacement()
    )
  );
});

test("updateDisplacement on existing nodes should succeed", () => {
  const newDisplacement = {
    node1: { x: 5, y: 10 },
    node2: { x: 20, y: 30 },
    node3: { x: -5, y: -10 },
  };

  const existingNodes = [
    new Node(
      "node1",
      "A",
      new Coordinates(),
      new Force(),
      new Support("Pin"),
      new Displacement()
    ),
    new Node(
      "node2",
      "B",
      new Coordinates(),
      new Force(),
      new Support(),
      new Displacement()
    ),
    new Node(
      "node3",
      "C",
      new Coordinates(),
      new Force(),
      new Support("Pin"),
      new Displacement()
    ),
  ];
  const updatedNodes = controller.updateDisplacement(
    newDisplacement,
    existingNodes
  );
  expect(updatedNodes).toContainEqual(
    new Node(
      "node1",
      "A",
      new Coordinates(),
      new Force(),
      new Support("Pin"),
      new Displacement(5, 10)
    )
  );
  expect(updatedNodes).toContainEqual(
    new Node(
      "node2",
      "B",
      new Coordinates(),
      new Force(),
      new Support(),
      new Displacement(20, 30)
    )
  );
  expect(updatedNodes).toContainEqual(
    new Node(
      "node3",
      "C",
      new Coordinates(),
      new Force(),
      new Support("Pin"),
      new Displacement(-5, -10)
    )
  );
});
