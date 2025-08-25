import { useMutation } from "@tanstack/react-query";

import { AccountApi } from "@/api";

export const useAccount = () => {
    const mutationLogin = useMutation({
        mutationFn: (data: { email: string; password: string }) => AccountApi.login(data),
    });
    return {
        mutationLogin,
    };
};
