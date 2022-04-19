import NextAuth from "next-auth"
import Credentials from 'next-auth/providers/credentials'
import GithubProvider from "next-auth/providers/github"
import { dbUsers } from '../../../database'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Credentials({
      name: 'Custom Login',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'Email',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password',
        }
      },
      async authorize(credentials){
        return dbUsers.validateUser(credentials!.email, credentials!.password)
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    })
  ],
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register',
  },
  session: {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    strategy: 'jwt',
    updateAge: 86400 // 1 day
  },
  callbacks: {
    async jwt({token,account,user}){
      if(account){
        token.accessToken = account.access_token;
        switch(account.type){
          case 'credentials':
            token.user = user;
          break;
          case 'oauth':
            token.user = await dbUsers.createUserFromOauth(user?.email || '', user?.name || '');
          break;
        }
      }
      return token;
    },
    async session({session,token,user}){
      session.accessToken = token.accessToken;
      session.user = token.user as any;
      return session;
    }
  }
})