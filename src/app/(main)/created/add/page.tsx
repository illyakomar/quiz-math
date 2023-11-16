import TestForm from '@/components/forms/test/Test';

export default function AddQuiz() {
  return (
    <>
      <div className='page__title-container'>
        <div className='page__title'>
          <span>Створити тест</span>
        </div>
      </div>
      <div className='page__line' />
      <TestForm mode='create' />
    </>
  );
}
