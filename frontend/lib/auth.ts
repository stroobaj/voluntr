import NextAuth, { AuthOptions, SessionStrategy } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        // ✅ Ensure credentials are defined
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing email or password');
        }

        // Replace this with real authentication logic
        if (
          credentials.email === 'test@example.com' &&
          credentials.password === 'password'
        ) {
          return { id: '1', name: 'Test User', email: credentials.email };
        }

        throw new Error('Invalid email or password');
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt' as SessionStrategy, // ✅ Ensures TypeScript understands the type
  },
};

export default NextAuth(authOptions);
