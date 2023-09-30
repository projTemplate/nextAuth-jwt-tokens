import {JwtPayload, sign, verify} from "jsonwebtoken";
import exp from "constants";

const accessTime = 60 * 30
const secret = 'some secret'
export const signToken = (payload, time) => {
    const token = sign(
        payload,
        secret,
        {
            expiresIn: time
        }
    );
    return token
}
export const verifyToken = (token) => {
    try {
        const tok = verify(token, secret)
        return tok as JwtPayload
    } catch (e) {
        console.log("token not verified")
        return null
    }
}
export const users = {
    "user1@gmail.com": {
        name: 'user1',
        email: 'user1@gmail.com',
        password: '1234',
        role: 'user'
    },
    'admin1@gmail.com': {
        name: 'admin1',
        email: 'admin1@gmail.com',
        password: '4321',
        role: 'admin'
    }
}

