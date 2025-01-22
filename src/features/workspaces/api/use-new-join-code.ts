import { useConvexMutation } from "@convex-dev/react-query";
import { api } from "../../../../convex/_generated/api";
import { useMutation } from "@tanstack/react-query";

export const useNewJoinCode = () => {
    return useMutation({
        mutationFn: useConvexMutation(api.workspace.newJoinCode),
    });
}