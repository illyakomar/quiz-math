import { Toaster } from 'react-hot-toast';

import Sidebar from '@/components/sidebar/Sidebar';

export const metadata = {
  title: 'Quiz math',
  description: 'With love',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
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
