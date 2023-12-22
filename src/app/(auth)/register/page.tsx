import Image from 'next/image';

import RegisterForm from '@/components/forms/register/Register';

export default async function Register() {
  return (
    <div className='auth-page'>
      <div className='auth-page__left'>
        <div className='auth-page__left-container'>
          <Image src={'/womanLaptop.png'} width={640} height={450} alt='' priority />
        </div>
      </div>
      <div className='auth-page__right'>
        <div className='auth-page__right-container'>
          <h1 className='right-container__logo'>QuizMath</h1>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
