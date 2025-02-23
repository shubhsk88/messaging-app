import { useQuery } from "@tanstack/react-query";
import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";
import { convexQuery } from "@convex-dev/react-query";

interface UseGetChannelProps{
    id: Id<'channels'>
    
}

export const useGetChannel = ({ id }: UseGetChannelProps) => {
return useQuery(convexQuery(api.channel.getById,{id}))
}