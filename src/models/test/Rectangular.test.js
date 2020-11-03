import Rectangular from "../Rectangular";

test("Create Rectangular instance", () => {
  const section = new Rectangular();
  expect(section.type).toBe("Rectangular");
  expect(section.width).toBe(1);
  expect(section.height).toBe(1);
  expect(section.area).toBe(1);
});
