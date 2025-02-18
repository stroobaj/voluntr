import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/auth';
import '../globals.css';
import React from 'react';

export const metadata: Metadata = {
  title: 'Voluntr',
  description: 'A volunteer management platform',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <nav className="bg-white shadow-md p-4 flex justify-between">
          <h1 className="font-bold text-xl">Voluntr</h1>
          <div>
            {session ? (
              <a href="/dashboard" className="text-blue-500">
                Dashboard
              </a>
            ) : (
              <a href="/auth/login" className="text-blue-500">
                Sign In
              </a>
            )}
          </div>
        </nav>
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
