import { joinWith } from "../css";
test("joinWith should join as well as include suffix at the end", () => {
  expect(joinWith([1, 2, 3], "fr ")).toBe("1fr 2fr 3fr");
});
