'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import '@/styles/components/_card.scss';

interface Props {
  id: string;
  name: string;
  color: string;
  route: string;
}

const Card = (props: Props) => {
  const { id, name, color, route } = props;

  const router = useRouter();

  const onCardClick = () => router.push(`${route}/${id}`);

  return (
    <div className='card' onClick={onCardClick} style={{ backgroundColor: color }}>
      <div className='card__image-container'>
        <Image src='/bookone.png' width={110} height={110} alt='Quiz' />
      </div>
      <p className='card__info'>{name}</p>
    </div>
  );
};

export default Card;
