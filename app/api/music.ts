import type { MusicType } from "@/types";

import { axiosClient } from "./axios-client";

export const MusicApi = {
    getTopViews: (): Promise<{ data: MusicType[] }> => {
        const response = axiosClient.get("/music/top-views?_limit=50&_type=million");
        return response;
    },
    getMusicName: (name: string): Promise<{ data: MusicType }> => {
        const response = axiosClient.get(`/music/get-music-name?_name=${name}`);
        return response;
    },
};
