import { defineSchema, defineTable } from 'convex/server';
import { authTables } from '@convex-dev/auth/server';
import { v } from 'convex/values';

const schema = defineSchema({
  ...authTables,
  workspace: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    userId: v.id('users'),
    joinCode: v.string()
  }),
  members: defineTable({
    userId: v.id('users'),
    workspaceId: v.id('workspace'),
    role:v.union(v.literal('admin'), v.literal('member'))
  }).index('by_user_id', ['userId']).index('by_workspace_id', ['workspaceId']).index('by_user_id_and_workspace_id', ['userId', 'workspaceId']),
  channels: defineTable({
    name: v.string()
    , workspaceId: v.id('workspace')
  }).index('by_workspace_id', ['workspaceId'])
,
  // Your other tables...
});

export default schema;
