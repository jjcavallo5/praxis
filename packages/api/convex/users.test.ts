import { describe, it, expect } from "vite-plus/test";
import { convexTest } from "convex-test";
import schema from "./schema";
import { api } from "./_generated/api";
import { modules } from "../test.setup";

describe("create user", () => {
  it("create user validates properly when authenticated", async () => {
    // Create test user via endpoint
    const t = convexTest(schema, modules);
    const asAuthedUser = t.withIdentity({ subject: "test-user-token" });
    const expected = await asAuthedUser.mutation(api.users.create);

    // Look directly at db to find if user exists
    const allUsers = await t.run((ctx) => ctx.db.query("users").collect());
    expect(allUsers.length).toBe(1);
    expect(allUsers[0]?.subject).toBe("test-user-token");
    expect(allUsers[0]?._id).toBe(expected);
  });

  it("create user rejects on unauthorized request", async () => {
    // Unauthorized test client
    const t = convexTest(schema, modules);
    await expect(() => t.mutation(api.users.create)).rejects.toThrow("Unauthorized");
  });
});

describe("get user", () => {
  it("get user returns user if authenticated", async () => {
    // Create test user via endpoint
    const t = convexTest(schema, modules);
    await t.run((ctx) => ctx.db.insert("users", { subject: "test-user-token" }));

    // User should exist
    const asAuthedUser = t.withIdentity({ subject: "test-user-token" });
    const user = await asAuthedUser.query(api.users.get);
    expect(user).not.toBeNull();
    expect(user.subject).toBe("test-user-token");
  });

  it("get user throws if user doesn't exist", async () => {
    // Create test user via endpoint
    const t = convexTest(schema, modules);
    const asAuthedUser = t.withIdentity({ subject: "test-user-token" });

    // User doesn't exist, catch error
    await expect(() => asAuthedUser.query(api.users.get)).rejects.toThrow("User not found");
  });

  it("get user rejects if not authenticated", async () => {
    // Unauthorized test client
    const t = convexTest(schema, modules);
    await expect(() => t.query(api.users.get)).rejects.toThrow("Unauthorized");
  });
});
