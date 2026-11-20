import { authStateFnImpl } from "./auth.functions";
import { describe, it, expect, vitest } from "vitest";
import { clerkClient, auth } from "@clerk/tanstack-react-start/server";

const clerkClientReturn = {
  users: {
    getUser: (_userId: string) =>
      Promise.resolve({
        firstName: "First",
        lastName: "Last",
        lastSignInAt: 0,
      }),
  },
};

vitest.mock("@clerk/tanstack-react-start/server", () => ({
  clerkClient: () => clerkClientReturn,
  auth: vitest.fn(),
}));

const mockedAuth = vitest.mocked(auth);

describe("Auth state function tests", () => {
  it("returns first and last name when authenticated", async () => {
    mockedAuth.mockImplementationOnce(() =>
      Promise.resolve({ isAuthenticated: true, userId: "testid" } as Awaited<
        ReturnType<typeof auth>
      >),
    );
    const result = await authStateFnImpl();
    expect(result.firstName).toBe("First");
    expect(result.lastName).toBe("Last");
    expect(result.lastSignedIn).toBe(0);
  });

  it("returns first and last name when authenticated", async () => {
    mockedAuth.mockImplementationOnce(() =>
      Promise.resolve({ isAuthenticated: false, userId: null } as Awaited<ReturnType<typeof auth>>),
    );
    await expect(() => authStateFnImpl()).rejects.toThrow();
  });
});
