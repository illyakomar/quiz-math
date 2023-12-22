'use client';

import Participant from '@/components/participant/Participant';
import { TestOutput } from '@/database/test/schemas/test.schema';

import '@/styles/components/_results.scss';

interface IProps extends Pick<TestOutput, 'participants'> {
  questionsCount: number;
}

const Results = (props: IProps) => {
  const { participants, questionsCount } = props;

  const participantsList = participants?.map((participant, index) => (
    <Participant key={index} questionsCount={questionsCount} {...participant} />
  ));

  return (
    <>
      <p className='results__member'>Учасників: {participants.length}</p>
      <div className='results__form'>
        <p className='results__form__title'>Результати:</p>
        <div className='results__form__list'>{participantsList}</div>
      </div>
    </>
  );
};

export default Results;
