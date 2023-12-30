import connectDB from "@/server/libs/mongoose";
import User from "@/server/models/UserModel";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials) {
                const { user_name, user_password }: any = credentials;

                // connect to DB
                await connectDB();
                const user = await User.findOne({ user_name });
                const isMatch = await bcrypt.compare(
                    user_password,
                    user.user_password
                );

                if (!user) {
                    throw new Error("Incorrect username");
                } else if (user && !isMatch) {
                    throw new Error("Incorrect password");
                }

                return {
                    id: user._id,
                    user_team: user.user_team,
                };
            },
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            return true;
        },
        async jwt({ token, user, session, trigger }: any) {
            if (trigger === "update") {
               return {
                ...token,
                ...session.user
               }
            }
            if (user) {
                return {
                    ...token,
                    id: user.id,
                    user_team: user?.user_team,
                };
            }
            return token;
        },
        async session({ session, token, user }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    user_team: token.user_team,
                },
            };
            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
    },
    pages: {
        signIn: "/auth/login",
    },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };




