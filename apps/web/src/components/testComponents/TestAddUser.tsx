import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";
import { api } from "@praxis/api";

const TestAddUser = () => {
  const save = useMutation({
    mutationFn: useConvexMutation(api.testTable.create),
    onSuccess: () => setName(""),
    onError: (error) => console.error(error),
  });

  const [name, setName] = useState("");

  return (
    <div className="flex flex-row gap-2 max-w-[350px]">
      <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
      <Button onClick={() => save.mutate({ name })}>Add</Button>
    </div>
  );
};

export default TestAddUser;
