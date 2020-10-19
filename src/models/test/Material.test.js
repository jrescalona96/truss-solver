import Material from "../Material";

test("Will create material instance", () => {
  const wood = new Material("Wood");
  expect(wood.type).toBe("Wood");
  expect(wood.index).toBe(3);
  expect(wood.rating).toBe(4200);
});

test("Will update material instance to Steel from Wood", () => {
  const material = new Material("Wood");
  expect(material.type).toBe("Wood");
  expect(material.index).toBe(3);
  expect(material.rating).toBe(4200);

  material.type = "Steel";
  expect(material.type).toBe("Steel");
  expect(material.index).toBe(1);
  expect(material.rating).toBe(29000);
});
