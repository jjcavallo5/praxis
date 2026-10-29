import TestAddUser from "@/components/testComponents/TestAddUser";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { LoaderCircle } from "lucide-react";
import TestListUsers from "@/components/testComponents/TestListUsers";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">Welcome to TanStack Start</h1>
      <h3>Enter a name</h3>
      <TestAddUser />
      <Suspense fallback={<LoaderCircle className="animate-spin" />}>
        <TestListUsers />
      </Suspense>
    </div>
  );
}
