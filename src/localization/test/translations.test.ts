import { getTranslation } from "../translations";
describe("Get translations", () => {
  test("without variable replacement", () => {
    expect(getTranslation("highAbbreviation", "en")).toBe("H");
  });
  test("with variable replacement", () => {
    expect(getTranslation("degreesSymbol", "en", { value: "5" })).toBe("5°");
  });
});
