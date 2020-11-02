import * as data from "../dataServices";
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

  const result = data.exaggerate(nodes, 60);

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
  const result = data.createBarResults(bars, calcNodes);

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
