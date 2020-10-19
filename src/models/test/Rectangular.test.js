import Rectangular from "../Rectangular";

const section = new Rectangular();
test("Create Rectangular instance", () => {
  expect(section.type).toBe("Rectangular");
  expect(section.width).toBe(1);
  expect(section.height).toBe(1);
  expect(section.area).toBe(1);
});

test("Modify Rectangular radius", () => {
  section.width = 100;
  section.height = 20;
  const area = 100 * 20;
  expect(section.width).toBe(100);
  expect(section.height).toBe(20);
  expect(section.area).toBe(area);
});
