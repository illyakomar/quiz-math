'use client';

import { ParticipantDocument } from '@/database/test/schemas/participant.schema';

import '@/styles/components/_results.scss';

interface IProps extends Partial<ParticipantDocument> {}

const Participant = (props: IProps) => {
  const { firstName, lastName } = props;

  return (
    <div className='participant'>
      <p className='participant__text'>{`${firstName} ${lastName}`}</p>
      <div className='answears-container'>
        <div className='answears-container__correct'>{10}</div>
        <div className='answears-container__incorrect'>{10}</div>
      </div>
    </div>
  );
};

export default Participant;
