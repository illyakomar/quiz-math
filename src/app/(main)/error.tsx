'use client';

import Link from 'next/link';

import Button from '@/components/ui/Button';

interface IProps {
  reset: () => void;
}

export default function Error(props: IProps) {
  const { reset } = props;

  return (
    <div className='error'>
      <div className='error__title'>Не вдалося завантажити сторінку</div>
      <div className='error__subtitle'>Будь ласка спробуйте ще, або поверніться на головну</div>
      <div className='error__buttons-container'>
        <Button color='primary' onClick={reset}>
          Повторити
        </Button>
        <Link href='/created' className='btn secondary'>
          На головну
        </Link>
      </div>
    </div>
  );
}
