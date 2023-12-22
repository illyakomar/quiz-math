import Image from 'next/image';
import Link from 'next/link';

export default function RootNotFound() {
  return (
    <div className='page-error'>
      <Image src={'/manSkateboard.png'} width={250} height={280} alt='' priority />
      <div className='page-error__title'>Сторінку не знайдено</div>
      <div className='page-error__subtitle'>Не вдалося знайти сторінку за вашим запитом</div>
      <div className='page-error__buttons-container'>
        <Link href='/' className='btn primary'>
          На головну
        </Link>
      </div>
    </div>
  );
}
