import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "hello@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials, req) {
        // if (!credentials || !credentials.email || !credentials.password) {
        //   return null;
        // }

        // const existingUser = await prisma.user.findUnique({
        //   where: {
        //     email: credentials.email,
        //   },
        // });

        // if (!existingUser || !existingUser.hashedPassword) {
        //   return null;
        // }

        // const match = await bcrypt.compare(
        //   credentials.password,
        //   existingUser.hashedPassword
        // );

        // if (match) {
        //   return {
        //     email: existingUser.email,
        //     password: existingUser.hashedPassword,
        //   };
        // } else {
        //   return null;
        // }

        const user = { id: "1", name: "Ethan", email: "test@gmail.com" };
        return user;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
