'use client';

import { ParticipantDocument } from '@/database/schemas/participant.schema';

import '@/styles/components/_results.scss';

interface IProps extends Partial<ParticipantDocument> {}

const Participant = (props: IProps) => {
  const { firstName, lastName, correcrAnswersCount } = props;

  return (
    <div className='participant'>
      <p className='participant__text'>{`${firstName} ${lastName}`}</p>
      <div className='answears-container'>
        <div className='answears-container__correct'>{correcrAnswersCount}</div>
        <div className='answears-container__incorrect'>{correcrAnswersCount}</div>
      </div>
    </div>
  );
};

export default Participant;
