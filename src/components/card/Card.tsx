'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import '@/styles/components/_card.scss';
import { TestOutput } from '@/database/test/schemas/test.schema';

interface Props extends Partial<TestOutput> {
  route: string;
}

const Card = (props: Props) => {
  const { _id, title, color, questions, participants, route } = props;

  const router = useRouter();

  const onCardClick = () => router.push(`${route}/${_id}`);

  return (
    <div className='card' onClick={onCardClick} style={{ backgroundColor: color }}>
      <div className='card__image-container'>
        <Image src='/bookone.png' width={110} height={110} alt='Quiz' priority />
      </div>
      <div className='card__info-container'>
        <p className='card__info'>{title}</p>
        {questions && <p className='card__info'>Питань: {questions.length}</p>}
        {participants && <p className='card__info'>Учасників: {participants.length}</p>}
      </div>
    </div>
  );
};

export default Card;
