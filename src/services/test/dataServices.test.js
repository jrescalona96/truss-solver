import * as data from "../dataServices";
import Node from "../../models/Node";
import Coordinates from "../../models/Coordinates";
import Force from "../../models/Force";
import Support from "../../models/Support";
import Displacement from "../../models/Displacement";

test("exaggerateDisplacement by 60%", () => {
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
  const result = data.exaggerateDisplacement(nodes, 60);

  expect(result).toContainEqual(
    new Node(
      "node1",
      "A",
      new Coordinates(),
      new Force(),
      new Support("Pin"),
      new Displacement(60, 60)
    )
  );
  expect(result).toContainEqual(
    new Node(
      "node2",
      "B",
      new Coordinates(),
      new Force(),
      new Support("Pin"),
      new Displacement(120, 120)
    )
  );
});
