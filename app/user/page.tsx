"use client";
import Button from "../../components/elements/Button";

import {useSession} from "next-auth/react";
import React, {useState} from "react";
import {User} from "../../types/interfaces";
import useAxiosAuth from "../../lib/hooks/useAxiosAuth";

const Page = () => {
    const {data: session} = useSession();
    const [userData, setUserData] = useState<User>();
    const axiosAuth = useAxiosAuth();

    const fetchUserProfile = async () => {
        console.log(session);

        // const res = await fetch(`http://localhost:3000/api/profile`, {
        //     method: "GET",
        //     headers: {
        //         "Content-Type": "application/json",
        //         Authorization: `${session?.user.accessToken}`,
        //     },
        // });
        const res = await axiosAuth.get('/profile')
        // const data = await res.json();
        setUserData(res.data);
        console.log(res.data)
    };
    return (
        <div className="px-10">
            <p className="flex justify-center items-center p-5 text-sky-500 text-lg font-bold">
                This
                is

                user
                Panel </p>
            < Button
                onClick={fetchUserProfile}> Get
                User
                Profile </Button>
            < div
                className="grid grid-cols-5">
                <p className="text-slate-600"> UserName
                    :
                </p>
                < p
                    className="col-span-4 text-sky-600"> {userData?.email
                }
                </p>
                < p
                    className="text-slate-600"> Name
                    :
                </p>
                < p
                    className="col-span-4  text-sky-600"> {userData?.name
                }
                </p>
                < p
                    className="text-slate-600"> Role
                    :
                </p>
                < p
                    className="col-span-4  text-sky-600"> {userData?.role
                }
                </p>
            </div>
        </div>
    )
        ;
};

export default Page;
