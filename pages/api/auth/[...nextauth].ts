import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import type {NextAuthOptions} from "next-auth";
import {User} from "next-auth";
import {Backend_URL} from "../../../lib/Constants";
import {JWT} from "next-auth/jwt";

async function refreshToken(token: JWT): Promise<JWT> {
    const res = await fetch(Backend_URL + "/auth/refresh", {
        method: "POST",
        headers: {
            authorization: `${token.user.refreshToken}`,
        },
    });
    console.log("refreshed");

    const response = await res.json();

    return {
        ...response
    };
}


export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        // ...add more providers here
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "jsmith",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },
            async authorize(credentials, req) {
                try {
                    const {email, password} = credentials as any;
                    console.log("cred==>", credentials)
                    const res = await fetch("http://localhost:3000/api/auth/login", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email,
                            password,
                        }),
                    });
                    console.log("res==", res.body)
                    const user = await res.json();

                    console.log({user});

                    if (res.ok && user) {
                        // Any object returned will be saved in `user` property of the JWT
                        return user
                    }  // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                    else return null;
                } catch (e) {
                    console.log(e.message)
                    return null
                }

            },
        }),
    ],

    callbacks: {
        //the token contains a user property
        async jwt({token, user, trigger, session}) {
            /**
             * over here we are updating the session when the update function is called
             */
            if (trigger === "update") {
                return {...token, user: session.user};
            }
            
            /**
             * jwt returns user on sign in other wise it is undefined
             * we are returning the user as an object property of the token when user first login
             * */
            if (user) return {...token, user};
            /**
             * if the access token has not expired just return the previous token
             */
            if (new Date().getTime() < token.user.expiresIn)
                return token;
                
            /**
             * if the access token has expired we refresh it and return the new user
             */
            const usr = await refreshToken(token)
            return {...token, user: usr};      
        },
        //the token property is the jwt property
        async session({session, token, user}) {
            // Send properties to the client, like an access_token from a provider.
            session.user = token.user;

            return session;
        },
    },

    pages: {
        signIn: "/auth/login",
    },
};

export default NextAuth(authOptions);
