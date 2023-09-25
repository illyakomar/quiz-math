'use client';

import Image from 'next/image';

import '@/styles/pages/_auth.scss';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function AuthTemplate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className='auth-page'>
      <div className='auth-page__left'>
        <div className='auth-page__left-container'>
          <Image
            className='left-container__image'
            src={pathname === '/login' ? '/manLaptop.png' : '/womanLaptop.png'}
            priority
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
