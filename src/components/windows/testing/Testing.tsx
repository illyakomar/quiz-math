'use client';

import Image from 'next/image';
import { useState } from 'react';
import LeadForm from '@/components/forms/lead/Lead';
import TestingControl from '@/components/controls/testing/Testing';
import { TestOutput } from '@/database/test/schemas/test.schema';
import { LeadSchemaType } from '@/app/(test)/[id]/types';

interface IProps extends TestOutput {}

export default function TestingWindow(props: IProps) {
  const { title } = props;

  const [participantFullName, setParticipantFullName] = useState('');
  const [showTest, setShowTest] = useState(false);

  const onLeadSuccessfullSubmit = (data: LeadSchemaType) => {
    setParticipantFullName(data.fullName);
    setShowTest(true);
  };

  if (showTest) return <TestingControl participantFullName={participantFullName} {...props} />;

  return (
    <div className='auth-page'>
      <div className='auth-page__left'>
        <div className='auth-page__left-container'>
          <Image src={'/manHoldingPaper.png'} width={400} height={550} alt='' priority />
        </div>
      </div>
      <div className='auth-page__right'>
        <div className='auth-page__right-container'>
          <h1 className='right-container__logo'>QuizMath</h1>
          <LeadForm title={title} onSuccessfullSubmit={onLeadSuccessfullSubmit} />
        </div>
      </div>
    </div>
  );
}
