# Testing the Clerk and Convex provider

Test `ClerkConvexProvider` as a small provider wiring test: verify the nesting, the props passed to Convex, and that children render. Mock the third-party providers so this test covers your wrapper's responsibilities.

The current test needs three adjustments:

- Include `ClerkProvider` in the Clerk module mock; the component imports it.
- Use a client-shaped test value instead of `vitest.fn()`, which is not a `ConvexReactClient`.
- Enable a DOM environment for React Testing Library. The current Vite test configuration uses `environment: "node"`.

Install `jsdom` as a dev dependency from `apps/web`:

```sh
pnpm add -D jsdom
```

The file-level environment directive below enables jsdom for this test without changing the environment of other tests.

## Provider test example

Use this as the provider portion of `src/integrations/clerk/clerk-convex-provider.test.tsx`. Keep the server auth mock and the existing `fetchClerkAuthImpl` tests in the same file if desired. Replace the existing Clerk module mock with the one below.

```tsx
// @vitest-environment jsdom

import type { PropsWithChildren } from "react";
import type { ConvexReactClient } from "convex/react";
import { render, screen, within } from "@testing-library/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { useAuth } from "@clerk/tanstack-react-start";
import { expect, it, vitest } from "vitest";
import { ClerkConvexProvider } from "./clerk-convex-provider";

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
  ConvexProviderWithClerk: vitest.fn(
    ({ children }: PropsWithChildren) => (
      <div data-testid="convex-provider">{children}</div>
    ),
  ),
}));

it("connects Clerk and Convex and renders children", () => {
  // The mocked provider only receives this object; it calls no client methods.
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
```

There is no need to configure a return value for `mockedUseAuth` in this test. Your wrapper passes the hook through, and the mocked Convex provider never calls it.

The client assertion is intentionally limited to this mocked wiring test. If a test uses the real Convex provider, supply an actual client or a mock implementing the methods it calls.

## Server auth tests

Extracting `fetchClerkAuthImpl` makes its behavior straightforward to test separately. Keep the existing success test and cover these cases:

- Authenticated: returns the token and user ID from Clerk.
- Signed out: returns `{ token: null, userId: null }` when Clerk returns those values.
- Auth failure: propagates a rejection from `auth()`.
- Token failure: propagates a rejection from `getToken()`.

Use `mockResolvedValueOnce` or reset mock implementations between cases to keep tests independent. For rejected calls, use `await expect(fetchClerkAuthImpl()).rejects.toThrow(...)`.

This wrapper test verifies composition and prop forwarding. Actual Clerk session handling and Convex authentication require a separate integration or end-to-end test if you need coverage of that flow.
