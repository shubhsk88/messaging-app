import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";

export const create = mutation({
  args: {
        workspaceId: v.id('workspace'),
      name:v.string()
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) {
            return []
        }
        const member = await ctx.db.query('members').withIndex('by_user_id_and_workspace_id', q => q.eq('userId', userId).eq('workspaceId', args.workspaceId)).unique();
         if(!member || member.role !== 'admin'){
             throw new Error('You are not authorized to create a channel')
         }
       
        const parsedName = args.name.replace(/\s+/g, '-').toLowerCase();
        return await ctx.db.insert('channels', {
            name: parsedName,
            workspaceId: args.workspaceId,
        })
        
    }
});
export const get = query({
    args: {
        workspaceId: v.id('workspace')
    },
    handler: async (ctx, args)=> {
        const userId = await auth.getUserId(ctx);
        if (!userId) {
            return []
        }
        
        const member = await ctx.db.query('members').withIndex('by_user_id_and_workspace_id', q => q.eq('userId', userId).eq('workspaceId', args.workspaceId)).unique();
         if(!member){
             return []
         }
        return await ctx.db.query('channels').withIndex('by_workspace_id', q => q.eq('workspaceId', args.workspaceId)).collect();
        
    },

})