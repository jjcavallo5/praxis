import AppHeader from "@/components/shared/AppHeader";
import { authStateFn } from "@/integrations/clerk/auth.functions";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/home")({
  beforeLoad: () => authStateFn(),
  component: RouteComponent,
});

function RouteComponent() {
  const context = Route.useRouteContext();

  return (
    <main className="flex flex-col w-full min-h-screen items-center">
      <AppHeader />
      <div className="flex flex-col w-full max-w-[1000px] py-8">
        <h1 className="text-xl font-bold italic">Welcome, {context.firstName ?? "to Praxis"}</h1>
      </div>
    </main>
  );
}
