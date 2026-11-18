import { Show, SignUpButton, SignInButton, UserButton } from "@clerk/tanstack-react-start";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import AppNavBar from "./AppNavBar";

const AppHeader = () => (
  <header className="flex flex-row justify-between items-center w-full border-b-[1px] border-border bg-card py-2 px-4">
    <div className="flex flex-row">
      <Link to="/">
        <h1 className="font-black">
          <i>PRAXIS</i>
        </h1>
      </Link>
      <AppNavBar />
    </div>
    <div className="flex flex-row items-center gap-1">
      <Show when="signed-out">
        <Button asChild variant="ghost">
          <SignInButton forceRedirectUrl="/home" />
        </Button>
        <Button asChild variant="outline">
          <SignUpButton forceRedirectUrl="/home" />
        </Button>
      </Show>
      <Show when="signed-in">
        <Button asChild variant="ghost" size="sm" className="mr-1">
          <Link to="/home">Dashboard &rarr;</Link>
        </Button>
        <UserButton />
      </Show>
    </div>
  </header>
);

export default AppHeader;
