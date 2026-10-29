import { useSuspenseQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "@praxis/api";

const TestListUsers = () => {
  const { data: users } = useSuspenseQuery(convexQuery(api.testTable.list));

  return (
    <ul>
      {users.map((user) => (
        <li key={user._id}>{user.name}</li>
      ))}
    </ul>
  );
};

export default TestListUsers;
