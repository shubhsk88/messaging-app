'use client';
import { useMutation } from '@tanstack/react-query';
import { useConvexMutation } from '@convex-dev/react-query';
import { api } from '../../../../convex/_generated/api';


export const useCreateChannel = () => {
  return useMutation({
    mutationFn: useConvexMutation(api.channel.create),
  });
};
