import { createRouter, createMemoryHistory, RouterProvider } from "@tanstack/react-router";
import { render, type RenderOptions } from "@testing-library/react";
import { QueryClient } from "@tanstack/react-query";
import { ConvexQueryClient } from "@convex-dev/react-query";
import { routeTree } from "@/routeTree.gen";

type RenderWithFileRoutesOptions = {
  initialLocation?: string;
} & Omit<RenderOptions, "wrapper">;

export const renderWithFileRoutes = (
  ui: React.ReactNode,
  { initialLocation = "/", ...opts }: RenderWithFileRoutesOptions,
) => {
  const convexQueryClient = new ConvexQueryClient(import.meta.env.VITE_CONVEX_URL);
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        queryKeyHashFn: convexQueryClient.hashFn(),
        queryFn: convexQueryClient.queryFn(),
      },
    },
  });
  convexQueryClient.connect(queryClient);

  const router = createRouter({
    routeTree,
    history: createMemoryHistory({
      initialEntries: [initialLocation],
    }),
    context: {
      queryClient,
      convexQueryClient,
      convexClient: convexQueryClient.convexClient,
    },
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <>
      <RouterProvider router={router} />
      {children}
    </>
  );

  return {
    ...render(ui, { wrapper: Wrapper, ...opts }),
    router,
  };
};
