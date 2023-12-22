import Image from 'next/image';

import LoginForm from '@/components/forms/login/Login';

export default async function Login() {
  return (
    <div className='auth-page'>
      <div className='auth-page__left'>
        <div className='auth-page__left-container'>
          <Image src={'/manLaptop.png'} width={640} height={450} alt='' priority />
        </div>
      </div>
      <div className='auth-page__right'>
        <div className='auth-page__right-container'>
          <h1 className='right-container__logo'>QuizMath</h1>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
