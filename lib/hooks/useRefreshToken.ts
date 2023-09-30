"use client";

import axios from "../axiosConfig";
import {signIn, useSession} from "next-auth/react";

export const useRefreshToken = () => {
    const {data: session, update} = useSession();

    const refreshToken = async () => {
        const res = await axios.post("/auth/refresh", {
            refresh: session?.user.refreshToken,
        }, {
            headers: {
                Authorization: session?.user.refreshToken
            }
        });

        if (session) {
            // console.log("updating the refresh token from use refresh hook===========")
            /**
             * over here you are updating the acess token by the new access token, 
             */
            session.user.accessToken = res.data.accessToken
            await update({
                ...session,
                user: res.data
            });
        } else signIn();
    };
    return refreshToken;
};
