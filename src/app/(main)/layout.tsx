import { getServerSession } from 'next-auth';
import { Toaster } from 'react-hot-toast';

import Sidebar from '@/components/sidebar/Sidebar';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Quiz math',
  description: 'With love',
};

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();

  if (!session) redirect('/login');

  return (
    <div className='layout'>
      <Sidebar />
      <div className='layout__main-content'>
        <Toaster />
        <div className='page'>{children}</div>
      </div>
    </div>
  );
}
