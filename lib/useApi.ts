import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

type QueryHookOptions<T> = {
  queryKey?: string;
  enabled?: boolean;
  onSuccess?: (data: T) => void;
};

type MutationHookOptions<T> = {
  onSuccess?: (data: T) => void;
};

export const useApiQuery = <T, P extends any[]>(
  apiFunction: (...args: P) => Promise<T>,
  params: P,
  options?: QueryHookOptions<T>
) => {
  return useQuery<T, Error>({
    queryKey: [options?.queryKey || '', ...params],
    queryFn: () => apiFunction(...params || []),
    enabled: options?.enabled ?? true,
    staleTime: 0,
  });
};

export const useApiMutation = <T, V = unknown>(
  apiFunction: (...args : any) => Promise<T>,
  options?: MutationHookOptions<T>
) => {
  const queryClient = useQueryClient();

  return useMutation<T, Error, V>({
    mutationFn: apiFunction,
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      options?.onSuccess?.(data);
    },
  });
};
