import NextAuth from "next-auth";
import {User} from "./interfaces";

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: User;
    }
}
import {JWT} from "next-auth/jwt";

declare module "next-auth/jwt" {
    interface JWT {
        user: User
    }
}
