import { describe, it, expect } from "vite-plus/test";
import { convexTest } from "convex-test";
import schema from "./schema";
import { api } from "./_generated/api";
import { modules } from "../test.setup";

describe("test tests", () => {
  it("list", async () => {
    const t = convexTest(schema, modules);
    const id = await t.run((ctx) => ctx.db.insert("testTable", { name: "test" }));
    const result = await t.query(api.testTable.list);
    expect(result).toEqual([{ _id: id, _creationTime: expect.any(Number), name: "test" }]);
  });
});
