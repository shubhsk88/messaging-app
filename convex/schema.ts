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
  })
  // Your other tables...
});

export default schema;
