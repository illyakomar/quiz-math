'use client';

import Link from 'next/link';
import Image from 'next/image';

import Button from '@/components/ui/Button';

interface IProps {
  reset: () => void;
}

export default function Error(props: IProps) {
  const { reset } = props;

  return (
    <div className='page__center-container'>
      <Image src={'/girlSolving.png'} width={250} height={250} alt='' priority />
      <div className='page-error__title'>Не вдалося завантажити сторінку</div>
      <div className='page-error__subtitle'>
        Будь ласка спробуйте ще, або поверніться на головну
      </div>
      <div className='page-error__buttons-container'>
        <Button color='primary' onClick={reset}>
          Повторити
        </Button>
        <Link href='/' className='btn secondary'>
          На головну
        </Link>
      </div>
    </div>
  );
}
