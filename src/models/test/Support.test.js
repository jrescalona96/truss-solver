import Support from "../Support";

test("Support x and y = 1", () => {
  const pin = new Support("Pin");
  const { x, y } = pin;
  expect(x).toBe(1);
  expect(y).toBe(1);
});

test("Name should be Pin", () => {
  const pin = new Support("Pin");
  expect(pin.type).toBe("Pin");
});

test("Support x = 0 and y = 1", () => {
  const roller = new Support("Roller");
  const { x, y } = roller;
  expect(x).toBe(0);
  expect(y).toBe(1);
});

test("Name should be Roller", () => {
  const roller = new Support("Roller");
  expect(roller.type).toBe("Roller");
});
