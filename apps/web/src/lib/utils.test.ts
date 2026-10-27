import { cn } from "./utils";
import { test, expect } from "vitest";

test("cn merges classes", () => {
  const result = cn("classA", "classB");
  expect(result).toBe("classA classB");
});
