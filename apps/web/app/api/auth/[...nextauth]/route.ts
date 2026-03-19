import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials, req) {
                const user = { id: "1", name: "John Doe", email: 'keven@example.com' }

                if (user) {
                    return user
                } else {
                    return null
                }
            }
        })
    ]
})

export { handler as GET, handler as POST }