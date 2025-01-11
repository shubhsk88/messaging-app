import { useQuery } from "@tanstack/react-query";
import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";
import { convexQuery } from "@convex-dev/react-query";

interface UseGetChannelsProps{
    workspaceId: Id<'workspace'>
    
}

export const useGetChannels = ({ workspaceId }: UseGetChannelsProps) => {
return useQuery(convexQuery(api.channel.get,{workspaceId}))
}