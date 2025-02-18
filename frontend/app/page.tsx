import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import authOptions from '@/lib/auth';

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/login'); // ✅ Redirect to login if not authenticated
  }

  redirect('/dashboard'); // ✅ Redirect to dashboard if logged in
}
