import NextAuth from "next-auth";
import { User } from "next-auth";
declare module "next-auth" {
  interface User {
    accessToken: any;
    refreshToken: any;
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      username: string;
      accessToken: string;
      refreshToken: string;
    };
  }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      email: string;
      name: string;
      accessToken: string;
      refreshToken: string;
    };
  }
}
