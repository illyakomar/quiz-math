'use client';

import Participant from '@/components/participant/Participant';
import { TestDocument } from '@/database/test/schemas/test.schema';

import '@/styles/components/_results.scss';

interface IProps extends TestDocument {}

const Results = (props: IProps) => {
  const { title, questions, participants, status, color } = props;

  const participantsList = participants?.map((participant, index) => (
    <Participant key={index} {...participant} />
  ));

  return (
    <>
      <p className='results__member'>10 учасників</p>
      <div className='results__buttons'>{/* <TestControl /> */}</div>
      <div className='results__form'>
        <p className='results__form__title'>Результати:</p>
        <div className='results__form__list'>{participantsList}</div>
      </div>
    </>
  );
};

export default Results;
