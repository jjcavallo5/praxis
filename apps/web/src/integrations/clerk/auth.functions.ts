import { createServerFn } from "@tanstack/react-start";
import { clerkClient, auth } from "@clerk/tanstack-react-start/server";

export const authStateFnImpl = async () => {
  const { isAuthenticated, userId } = await auth();
  if (!isAuthenticated) throw new Error("Unauthorized");
  const user = await clerkClient().users.getUser(userId);
  return { firstName: user.firstName, lastName: user.lastName, lastSignedIn: user.lastSignInAt };
};

export const authStateFn = createServerFn({ method: "GET" }).handler(authStateFnImpl);
