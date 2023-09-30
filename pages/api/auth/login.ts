import {NextResponse} from "next/server";
import {signToken, users} from "../../../lib/jwt";

import type {NextApiRequest, NextApiResponse} from 'next'
import {User} from "../../../types/interfaces";
import {accessExpires} from "../../../lib/Constants";


export default async function POST(req: NextApiRequest, resp: NextApiResponse) {
    // console.log("===>resolver")

    const {email, password} = req.body;
    // console.log("===>user", email)
    let result = users[email]
    if (!result || result.password !== password) {
        console.log(result)
        return resp.status(401).json("error")
    }
    // Make that below if condition as your own backend api call to validate user

    const accessToken = signToken({email, role: result.role}, accessExpires)
    const refreshToken = signToken({email, role: result.role}, '7d')


    const usr: User = {
        role: result.role,
        email,
        accessToken,
        refreshToken,
        expiresIn: new Date().setTime(new Date().getTime() + accessExpires)
    }


    return resp.status(200).json(usr)
}