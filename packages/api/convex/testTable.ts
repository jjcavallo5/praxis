import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {
    id: v.id("testTable"),
  },
  handler: (ctx, args) => ctx.db.get(args.id),
});

export const list = query({
  handler: (ctx) => ctx.db.query("testTable").collect(),
});

export const create = mutation({
  args: {
    name: v.string(),
  },
  handler: (ctx, args) => ctx.db.insert("testTable", args),
});

export const update = mutation({
  args: {
    id: v.id("testTable"),
    name: v.string().optional(),
  },
  handler: (ctx, args) => ctx.db.patch(args.id, { name: args.name }),
});

export const deleteRow = mutation({
  args: {
    id: v.id("testTable"),
  },
  handler: (ctx, args) => ctx.db.delete(args.id),
});
