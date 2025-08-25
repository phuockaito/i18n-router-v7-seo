import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchInterval: 1000 * 60 * 15,
            staleTime: 2000,
            retry: 1,
            queryFn: (params): unknown => {
                return queryClient.getQueryData(params.queryKey);
            },
        },
    },
});

export const Provider = ({ children }: { children: React.ReactNode }) => {
    return <QueryClientProvider client={queryClient}>{children} </QueryClientProvider>;
};
