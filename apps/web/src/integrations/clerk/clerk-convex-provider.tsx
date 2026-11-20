import type { PropsWithChildren } from "react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ClerkProvider, useAuth } from "@clerk/tanstack-react-start";
import { auth } from "@clerk/tanstack-react-start/server";
import { createServerFn } from "@tanstack/react-start";
import type { ConvexReactClient } from "convex/react";

type Props = { client: ConvexReactClient };

export const ClerkConvexProvider = ({ children, client }: PropsWithChildren<Props>) => (
  <ClerkProvider>
    <ConvexProviderWithClerk client={client} useAuth={useAuth}>
      {children}
    </ConvexProviderWithClerk>
  </ClerkProvider>
);

export const fetchClerkAuth = createServerFn({ method: "GET" }).handler(async () => {
  const { getToken, userId } = await auth();
  const token = await getToken();
  return { token, userId };
});
