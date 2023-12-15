import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import '@/styles/pages/_auth.scss';

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();

  if (session) redirect('/created');

  return <>{children}</>;
}
