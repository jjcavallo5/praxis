import type { PropsWithChildren } from "react";
import type { ConvexQueryClient } from "@convex-dev/react-query";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ClerkProvider, useAuth } from "@clerk/tanstack-react-start";

type Props = { client: ConvexQueryClient };

export const ClerkConvexProvider = ({ children, client }: PropsWithChildren<Props>) => (
  <ClerkProvider>
    <ConvexProviderWithClerk client={client.convexClient} useAuth={useAuth}>
      {children}
    </ConvexProviderWithClerk>
  </ClerkProvider>
);
