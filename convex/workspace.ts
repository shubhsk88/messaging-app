import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";


const generateCode = () => {
    // Add a 6 digit with all alphabet and numbers
    const code = Math.random().toString(36).substring(2, 8);
    return code
}
export const get = query({
    args:{},
    handler: async (ctx) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) {
            return []
        }
        const members = await ctx.db.query('members').withIndex('by_user_id', q => q.eq('userId', userId)).collect();

        const workspaceIds = members.map(m => m.workspaceId)
        const workspaces = [];

        for (const workspaceId of workspaceIds) {
            const workspace = await ctx.db.get(workspaceId);
            if (workspace) {
                
                workspaces.push(workspace)
            }
        }

        return workspaces;
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
        const member = await ctx.db.query('members').withIndex('by_user_id_and_workspace_id', q => q.eq('userId', userId).eq('workspaceId', args.id)).unique();
        if (!member) {
            return null
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
        const joinCode= generateCode();
        const workspaceId = await ctx.db.insert('workspace', {
            name: args.name,
            userId,
            joinCode
        })
        await ctx.db.insert('members', {
            userId,
            workspaceId,
            role:'admin'
        })
        return workspaceId
    }
})

export const update = mutation({
    args: {
        id: v.id('workspace'),
        name: v.string(),
    },
    handler: async (ctx, args) => {

        const userId = await auth.getUserId(ctx);
        if (!userId) {
            throw new Error('User not authenticated')
        }
        const member = await ctx.db.query('members').withIndex('by_user_id_and_workspace_id', q => q.eq('userId', userId).eq('workspaceId', args.id)).unique();
        if (!member || member.role !== 'admin') {
            throw new Error('User not authorized')
        }
        await ctx.db.patch(args.id, {
            name: args.name
        })
        return args.id

        
    }
})

export const remove = mutation({
  args: {
    id: v.id('workspace'),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error('User not authenticated');
    }
    const member = await ctx.db
      .query('members')
      .withIndex('by_user_id_and_workspace_id', (q) =>
        q.eq('userId', userId).eq('workspaceId', args.id)
      )
      .unique();
    if (!member || member.role !== 'admin') {
      throw new Error('User not authorized');
    }
      const [members] = await Promise.all([ctx.db.query('members').withIndex('by_workspace_id', q => q.eq('workspaceId', args.id)).collect()]);
      for (const member of members) {
          await ctx.db.delete(member._id);
        }
    await ctx.db.delete(args.id);
    return args.id;
  },
});