import {NextApiRequest, NextApiResponse} from "next";
import {verifyToken, users} from "../../lib/jwt";


export default async function GET(req: NextApiRequest, resp: NextApiResponse) {
    // console.log("===>resolver")
    const token = req.headers.authorization
    // console.log("tokn--", token)

    const result = verifyToken(token)
    // console.log("verified==>", result)
    if (!result) return resp.status(401).json("error")


    let user = users[result.email]
    // console.log("user is ", user)
    // Make that below if condition as your own backend api call to validate user


    const usr = {
        email: user.email,
        name: user.name,
    }


    return resp.status(200).json(usr)
}