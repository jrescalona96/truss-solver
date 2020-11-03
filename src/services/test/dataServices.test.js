import {
  exaggerate,
  createBarResults,
  convertToBarModel,
  convertToNodeModel,
} from "../dataServices";
import Node from "../../models/Node";
import Bar from "../../models/Bar";
import Material from "../../models/Material";
import Section from "../../models/Section";
import Coordinates from "../../models/Coordinates";
import Force from "../../models/Force";
import Support from "../../models/Support";
import Displacement from "../../models/Displacement";

test("exaggerate by 60%", () => {
  const nodes = [
    new Node(
      "node1",
      "A",
      new Coordinates(),
      new Force(),
      new Support("Pin"),
      new Displacement(1, 1)
    ),
    new Node(
      "node2",
      "B",
      new Coordinates(),
      new Force(),
      new Support("Pin"),
      new Displacement(2, 2)
    ),
  ];

  const result = exaggerate(nodes, 60);

  expect(result).toContainEqual(
    new Node(
      "node1",
      "A",
      new Coordinates(60, 60),
      new Force(),
      new Support(),
      new Displacement(60, 60)
    )
  );
  expect(result).toContainEqual(
    new Node(
      "node2",
      "B",
      new Coordinates(120, 120),
      new Force(),
      new Support(),
      new Displacement(120, 120)
    )
  );
});

test("createBarResults should succeed", () => {
  const node0 = new Node(
    "node0",
    "A",
    new Coordinates(),
    new Force(),
    new Support("Pin"),
    new Displacement()
  );

  const node1 = new Node(
    "node1",
    "B",
    new Coordinates(1, 1),
    new Force(),
    new Support("Pin"),
    new Displacement()
  );

  const node2 = new Node(
    "node2",
    "C",
    new Coordinates(2, 2),
    new Force(),
    new Support(),
    new Displacement()
  );

  const bar0 = new Bar(
    "bar0",
    node0,
    node1,
    new Material("Steel"),
    new Section("Circular")
  );

  const bar1 = new Bar(
    "bar1",
    node1,
    node2,
    new Material("Steel"),
    new Section("Circular")
  );
  const bar2 = new Bar(
    "bar2",
    node0,
    node2,
    new Material("Steel"),
    new Section("Circular")
  );

  const calcNodes = [{ ...node0 }, { ...node1 }, { ...node2 }];
  calcNodes[0].displacement = new Displacement(10, 10);
  calcNodes[1].displacement = new Displacement(10, 10);
  calcNodes[2].displacement = new Displacement(10, 10);

  const bars = [bar0, bar1, bar2];
  const result = createBarResults(bars, calcNodes);

  node0.displacement = new Displacement(10, 10);
  node1.displacement = new Displacement(10, 10);
  node2.displacement = new Displacement(10, 10);

  expect(result[0].nodeI).toEqual(node0);
  expect(result[0].nodeJ).toEqual(node1);

  expect(result[1].nodeI).toEqual(node1);
  expect(result[1].nodeJ).toEqual(node2);

  expect(result[2].nodeI).toEqual(node0);
  expect(result[2].nodeJ).toEqual(node2);
});

test("convertToNodeModel should return Node objects", () => {
  const data = [
    {
      _id: "_e64a4ewgl",
      name: "A",
      coordinates: { x: 0, y: 120 },
      force: { x: 0, y: 0 },
      support: { type: "Pin", x: 1, y: 1 },
      displacement: { x: 0, y: 0 },
    },
    {
      _id: "_66quanmr9",
      name: "B",
      coordinates: { x: 500, y: 120 },
      force: { x: 0, y: 0 },
      support: { type: "Roller", x: 0, y: 1 },
      displacement: { x: 0, y: 0 },
    },
    {
      _id: "_mwf72odwe",
      name: "C",
      coordinates: { x: 250, y: 250 },
      force: { x: -100, y: -100 },
      support: { type: "None", x: 0, y: 0 },
      displacement: { x: 0, y: 0 },
    },
  ];

  const res = convertToNodeModel(data);

  res.map((item) => {
    expect(item).toBeInstanceOf(Node);
  });
});

test("convertToNodeModel should fail", () => {
  expect(convertToNodeModel(null)).toBeNull();
  expect(convertToNodeModel(undefined)).toBeNull();
});

test("convertToBarModel should return Node objects", () => {
  const data = [
    {
      _id: "_c7az54cmn",
      nodeI: {
        _id: "_e64a4ewgl",
        name: "A",
        coordinates: { x: 0, y: 120 },
        force: { x: 0, y: 0 },
        support: { type: "Pin", x: 1, y: 1 },
        displacement: { x: 0, y: 0 },
      },
      nodeJ: {
        _id: "_66quanmr9",
        name: "B",
        coordinates: { x: 500, y: 120 },
        force: { x: 0, y: 0 },
        support: { type: "Roller", x: 0, y: 1 },
        displacement: { x: 0, y: 0 },
      },
      material: { _type: "Steel", _index: 1, _rating: 29000 },
      section: { type: "Circular", _radius: 1, area: 3.141592653589793 },
    },
    {
      _id: "_eygxu24zd",
      nodeI: {
        _id: "_e64a4ewgl",
        name: "A",
        coordinates: { x: 0, y: 120 },
        force: { x: 0, y: 0 },
        support: { type: "Pin", x: 1, y: 1 },
        displacement: { x: 0, y: 0 },
      },
      nodeJ: {
        _id: "_mwf72odwe",
        name: "C",
        coordinates: { x: 250, y: 250 },
        force: { x: -100, y: -100 },
        support: { type: "None", x: 0, y: 0 },
        displacement: { x: 0, y: 0 },
      },
      material: { _type: "Steel", _index: 1, _rating: 29000 },
      section: { type: "Circular", _radius: 1, area: 3.141592653589793 },
    },
    {
      _id: "_9iphsxa29",
      nodeI: {
        _id: "_mwf72odwe",
        name: "C",
        coordinates: { x: 250, y: 250 },
        force: { x: -100, y: -100 },
        support: { type: "None", x: 0, y: 0 },
        displacement: { x: 0, y: 0 },
      },
      nodeJ: {
        _id: "_66quanmr9",
        name: "B",
        coordinates: { x: 500, y: 120 },
        force: { x: 0, y: 0 },
        support: { type: "Roller", x: 0, y: 1 },
        displacement: { x: 0, y: 0 },
      },
      material: { _type: "Steel", _index: 1, _rating: 29000 },
      section: { type: "Circular", _radius: 1, area: 3.141592653589793 },
    },
  ];

  const res = convertToBarModel(data);

  res.map((item) => {
    expect(item).toBeInstanceOf(Bar);
  });
});

test("convertToBarModel should fail", () => {
  expect(convertToBarModel(null)).toBeNull();
  expect(convertToBarModel(undefined)).toBeNull();
});
