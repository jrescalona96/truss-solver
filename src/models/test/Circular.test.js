import Circular from "../Circular";

const section = new Circular();
test("Create Circular instance", () => {
  expect(section.type).toBe("Circular");
  expect(section.radius).toBe(1);
  expect(section.area).toBe(Math.PI);
  expect(section.diameter).toBe(2);
});

test("Modify Circular radius", () => {
  section.radius = 100;
  const area = Math.PI * 100 * 100;
  expect(section.radius).toBe(100);
  expect(section.diameter).toBe(200);
  expect(section.area).toBe(area);
});
