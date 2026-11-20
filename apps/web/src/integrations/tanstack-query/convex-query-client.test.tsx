import { getQueryClients } from "./convex-query-client";
import { describe, it, expect } from "vitest";

describe("Convex query client tests", () => {
  it("hashes from both clients resolve the same value", () => {
    const result = getQueryClients();

    const queryHashFn = result.queryClient.getDefaultOptions().queries?.queryKeyHashFn;
    const convexHashFn = result.convexQueryClient.hashFn();

    expect(queryHashFn).toBeDefined();

    const hashedFromQuery = queryHashFn?.(["test-string"]);
    const hashedFromConvex = convexHashFn(["test-string"]);

    expect(hashedFromQuery).toStrictEqual(hashedFromConvex);
  });
});
