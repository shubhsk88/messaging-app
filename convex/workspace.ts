import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";

export const get = query({
    args:{},
    handler: async (ctx) => {
        return await ctx.db.query('workspace').collect()
    }
})

export const getById = query({
    args: {
        id:v.id('workspace')
    },
    async handler(ctx, args) {
        const userId = await auth.getUserId(ctx);
        if (!userId) {
            throw new Error('User not authenticated')
        }
        return await ctx.db.get(args.id);


    },
})

export const create = mutation({
    args: {
        name: v.string(),
       
    },
    handler: async (ctx,args,) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) {
            throw new Error('User not authenticated')
        }
        const joinCode='123456'
        const workspaceId = await ctx.db.insert('workspace', {
            name: args.name,
            userId,
            joinCode
        })
        return workspaceId
    }
})