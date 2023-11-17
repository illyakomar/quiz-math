'use client';

import LeadForm from '@/components/forms/lead/Lead';
import Passing from '@/components/passingQuiz/passing/Passing';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function Test() {
  const [showQuiz, setShowQuiz] = useState(false);

  const searchParams = useSearchParams();

  const search = searchParams.get('code');

  if (showQuiz) {
    return <Passing />;
  }

  return (
    <div className='auth-page'>
      <div className='auth-page__left'>
        <div className='auth-page__left-container'>
          <Image
            className='left-container__image'
            src={'/manHoldingPaper.png'}
            width={300}
            height={450}
            alt=''
          />
        </div>
      </div>
      <div className='auth-page__right'>
        <div className='auth-page__right-container'>
          <h1 className='right-container__logo'>QuizMath</h1>
          <LeadForm
            name='Структури даних і абстрактні типи Pascal'
            onClick={() => setShowQuiz(true)}
          />
        </div>
      </div>
    </div>
  );
}
