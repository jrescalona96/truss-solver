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
test("createNode() should return null xCoord is String", () => {
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

test("_isValid() should return true ", () => {
  const node = new Node(
    "_qwert12345",
    "A",
    new Coordinates(),
    new Force(),
    new Support("Pin"),
    new Displacement()
  );
  expect(controller._isValid(node)).toBe(true);
});

test("_isValid() should return false ", () => {
  const node = new Node(
    "_qwert12345",
    "A",
    new Coordinates(),
    new Force(),
    new Support("Testing"),
    new Displacement()
  );
  expect(controller._isValid(node)).toBe(true);
});
