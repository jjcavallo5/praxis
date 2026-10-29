import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useConvexMutation } from "@convex-dev/react-query";
import { api } from "@praxis/api";

const TestAddUser = () => {
  const save = useConvexMutation(api.testTable.create);
  const [name, setName] = useState("");

  return (
    <div className="flex flex-row gap-2 max-w-[350px]">
      <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
      <Button onClick={() => save({ name })}>Add</Button>
    </div>
  );
};

export default TestAddUser;
