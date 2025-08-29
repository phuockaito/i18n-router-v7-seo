import { axiosClient } from "./axios-client";

export const AccountApi = {
    login: (data: { email: string; password: string }): Promise<{ accessToken: string }> => {
        return axiosClient.post("account/login", data);
    },
    getProfile: (accessToken: string) => {
        return axiosClient.get("/account/profile", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    },
};
