'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { redirect, usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import '@/styles/pages/_auth.scss';

export default function AuthTemplate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const session = useSession();

  // if (session.status === 'authenticated') {
  //   redirect('/created');
  // }

  if (session.status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <div className='auth-page'>
      <div className='auth-page__left'>
        <div className='auth-page__left-container'>
          <Image
            className='left-container__image'
            src={pathname === '/login' ? '/manLaptop.png' : '/womanLaptop.png'}
            width={640}
            height={450}
            alt=''
          />
        </div>
      </div>
      <div className='auth-page__right'>
        <div className='auth-page__right-container'>
          <h1 className='right-container__logo'>QuizMath</h1>
          {children}
        </div>
      </div>
    </div>
  );
}
