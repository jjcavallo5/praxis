import { HeadContent, Scripts, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { ClerkConvexProvider, fetchClerkAuth } from "@/integrations/clerk/clerk-convex-provider";

import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";

import appCss from "../styles.css?url";

import type { QueryClient } from "@tanstack/react-query";
import type { ConvexReactClient } from "convex/react";
import type { ConvexQueryClient } from "@convex-dev/react-query";

interface MyRouterContext {
  queryClient: QueryClient;
  convexClient: ConvexReactClient;
  convexQueryClient: ConvexQueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Praxis",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  beforeLoad: async (ctx) => {
    const { userId, token } = await fetchClerkAuth();
    if (token) ctx.context.convexQueryClient.serverHttpClient?.setAuth(token);
    return { userId, token };
  },
  shellComponent: AppWrapper,
});

function AppWrapper({ children }: { children: React.ReactNode }) {
  const context = Route.useRouteContext();
  return (
    <ClerkConvexProvider client={context.convexClient}>
      <RootDocument>{children}</RootDocument>
    </ClerkConvexProvider>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
