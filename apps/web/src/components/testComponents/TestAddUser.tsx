import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const TestAddUser = () => {
  const [name, setName] = useState("");

  return (
    <div className="flex flex-row gap-2 max-w-[350px]">
      <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
      <Button>Add</Button>
    </div>
  );
};

export default TestAddUser;
