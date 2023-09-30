import {NextApiRequest, NextApiResponse} from "next";
import {signToken, users, verifyToken} from "../../../lib/jwt";
import {accessExpires} from "../../../lib/Constants";

export default async function GET(req: NextApiRequest, resp: NextApiResponse) {
    console.log("===>refresh resolver")
    const refreshToken = req.headers.authorization

    const result = verifyToken(refreshToken)
    // console.log("verified==>", result)
    if (!result) return resp.status(401).json("error")

    const accessToken = signToken({email: result.email, role: result.role}, accessExpires)
    let user = users[result.email]
    // console.log("user is ", user)
    // Make that below if condition as your own backend api call to validate user


    const usr = {
        role: result.role,
        email: user.email,
        accessToken,
        refreshToken,
        expiresIn: new Date().setTime(new Date().getTime() + accessExpires)
    }


    return resp.status(200).json(usr)
}