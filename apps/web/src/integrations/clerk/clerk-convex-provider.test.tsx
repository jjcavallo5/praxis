import { auth } from "@clerk/tanstack-react-start/server";
import { describe, it, vitest, expect } from "vitest";
import { fetchClerkAuthImpl, ClerkConvexProvider } from "./clerk-convex-provider";
import { useAuth } from "@clerk/tanstack-react-start";
import { render, screen, within } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import type { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";

vitest.mock("@clerk/tanstack-react-start/server", () => ({
  auth: vitest.fn(),
}));

vitest.mock("@clerk/tanstack-react-start", () => ({
  ClerkProvider: ({ children }: PropsWithChildren) => (
    <div data-testid="clerk-provider">{children}</div>
  ),
  useAuth: vitest.fn(),
}));

vitest.mock("convex/react-clerk", () => ({
  ConvexProviderWithClerk: vitest.fn(({ children }: PropsWithChildren) => (
    <div data-testid="convex-provider">{children}</div>
  )),
}));

const mockedAuth = vitest.mocked(auth);

describe("ClerkConvexProvider tests", () => {
  it("connects Clerk and Convex and renders children", () => {
    const client = {} as ConvexReactClient;

    render(
      <ClerkConvexProvider client={client}>
        <span>App content</span>
      </ClerkConvexProvider>,
    );

    const clerk = screen.getByTestId("clerk-provider");
    const convex = within(clerk).getByTestId("convex-provider");
    expect(within(convex).getByText("App content")).toBeTruthy();

    const calls = vitest.mocked(ConvexProviderWithClerk).mock.calls;
    const props = calls[calls.length - 1]![0];
    expect(props.client).toBe(client);
    expect(props.useAuth).toBe(useAuth);
  });
});

describe("fetch clerk auth tests", () => {
  it("returns token", async () => {
    mockedAuth.mockResolvedValue({
      getToken: () => Promise.resolve("test-token"),
      userId: "user",
    } as Awaited<ReturnType<typeof auth>>);

    const result = await fetchClerkAuthImpl();

    expect(result.token).toBe("test-token");
    expect(result.userId).toBe("user");
  });
});
