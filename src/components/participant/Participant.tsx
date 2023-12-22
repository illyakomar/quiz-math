'use client';

import { ParticipantOutput } from '@/database/test/schemas/participant.schema';

import '@/styles/components/_results.scss';

interface IProps extends ParticipantOutput {
  questionsCount: number;
}

const Participant = (props: IProps) => {
  const { fullName, correctAnswersCount, questionsCount } = props;

  return (
    <div className='participant'>
      <p className='participant__text'>{`${fullName}`}</p>
      <div className='answers-container'>
        <div className='answers-container__correct'>{correctAnswersCount}</div>
        <div className='answers-container__incorrect'>{questionsCount - correctAnswersCount}</div>
      </div>
    </div>
  );
};

export default Participant;
