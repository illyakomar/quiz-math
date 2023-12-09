import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='error'>
      <div className='error__title'>Сторінку не знайдено</div>
      <div className='error__subtitle'>Не вдалося знайти сторінку за вашим запитом</div>
      <div className='error__buttons-container'>
        <Link href='/created' className='btn primary'>
          На головну
        </Link>
      </div>
    </div>
  );
}
