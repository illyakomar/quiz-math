import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { Toaster } from 'react-hot-toast';

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();

  if (session) redirect('/created');

  return (
    <>
      <Toaster />
      {children}
    </>
  );
}
