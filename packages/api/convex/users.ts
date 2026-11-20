import { query, mutation } from "./_generated/server";
import { ConvexError } from "convex/values";

export const create = mutation({
  handler: async (ctx) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new ConvexError("Unauthorized");
    return ctx.db.insert("users", { subject: user.subject });
  },
});

export const get = query({
  handler: async (ctx) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new ConvexError("Unauthorized");
    const userData = await ctx.db
      .query("users")
      .withIndex("by_subject", (q) => q.eq("subject", user.subject))
      .unique();
    if (!userData) throw new ConvexError("User not found");
    return userData;
  },
});
