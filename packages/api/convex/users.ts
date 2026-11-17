import type { Id } from "./_generated/dataModel";
import { query, mutation } from "./_generated/server";
import { ConvexError } from "convex/values";

export const create = mutation({
  handler: async (ctx) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new ConvexError("Unauthorized");
    ctx.db.insert("users", { subject: user.subject });
  },
});

export const get = query({
  handler: async (ctx) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new ConvexError("Unauthorized");
    ctx.db.get(user.subject as Id<"users">);
  },
});
