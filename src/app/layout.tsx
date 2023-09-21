import { Nunito } from 'next/font/google';
import { getServerSession } from 'next-auth';

import AuthProvider from '@/components/AuthProvider/AuthProvider';
import { authOptions } from './api/auth/[...nextauth]/route';

import 'react-responsive-modal/styles.css';

import './../styles/main.scss';

export const metadata = {
  title: 'Quiz math',
  description: 'With love',
};

const nunito = Nunito({
  subsets: ['cyrillic', 'latin'],
  display: 'swap',
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang='uk-UA' className={nunito.className}>
      <body>
        <AuthProvider session={session}>
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
