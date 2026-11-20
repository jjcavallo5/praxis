import { createFileRoute } from "@tanstack/react-router";
import { SignIn } from "@clerk/tanstack-react-start";

export const Route = createFileRoute("/_protected")({
  beforeLoad: async ({ context }) => {
    if (!context.userId) throw new Error("Unauthorized");
  },
  errorComponent: ({ error }) => {
    if (error instanceof Error && error.message === "Unauthorized") {
      return (
        <main className="flex items-center justify-center h-screen w-screen">
          <SignIn />
        </main>
      );
    }
    throw error;
  },
});
