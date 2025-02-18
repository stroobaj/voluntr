'use client';

import { signIn } from 'next-auth/react';

export default function Page() {
  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={() => signIn('google')}>Sign in with Google</button>
      <form method="post" action="/api/auth/callback/credentials">
        <input name="email" type="email" placeholder="Email" required />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
