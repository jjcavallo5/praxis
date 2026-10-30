import { describe, it, expect } from "vite-plus/test";
import { convexTest } from "convex-test";
import schema from "./schema";
import { api } from "./_generated/api";
import { modules } from "../test.setup";

describe("test tests", () => {
  it("create", async () => {
    const t = convexTest(schema, modules);
    await t.mutation(api.testTable.create, { name: "new test" });
    const result = await t.query(api.testTable.list);
    expect(result.length).toBe(1);
  });

  it("list", async () => {
    const t = convexTest(schema, modules);
    const id = await t.run((ctx) => ctx.db.insert("testTable", { name: "test" }));
    const result = await t.query(api.testTable.list);
    expect(result).toEqual([{ _id: id, _creationTime: expect.any(Number), name: "test" }]);
  });

  it("get + update", async () => {
    const t = convexTest(schema, modules);
    const id = await t.run((ctx) => ctx.db.insert("testTable", { name: "test" }));
    await t.mutation(api.testTable.update, { id, name: "updated" });
    const result = await t.query(api.testTable.get, { id });
    expect(result).toEqual({ _id: id, _creationTime: expect.any(Number), name: "updated" });
  });

  it("deleteRow", async () => {
    const t = convexTest(schema, modules);
    const id = await t.run((ctx) => ctx.db.insert("testTable", { name: "test" }));
    await t.mutation(api.testTable.deleteRow, { id });
    const result = await t.query(api.testTable.list);
    expect(result.length).toBe(0);
  });
});
