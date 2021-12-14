import { getCities } from "../queries";

test("get cities", async () => {
  const result = await getCities("mannheim");
  expect(result).toBeDefined();
});
