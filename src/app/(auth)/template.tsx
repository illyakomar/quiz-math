import Image from 'next/image';

import '@/styles/pages/_auth.scss';
import { headers } from 'next/dist/client/components/headers';

export default function AuthTemplate({ children }: { children: React.ReactNode }) {
  const url = headers().get('x-url');
  console.log(url);

  return (
    <div className='auth-page'>
      <div className='auth-page__left'>
        <div className='auth-page__left-container'>
          <Image
            className='left-container__image'
            src={'/manLaptop.png'}
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
