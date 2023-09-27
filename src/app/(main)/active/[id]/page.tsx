import Test from '@/database/models/test.model';
import connect from '@/database/connection';
import Results from '@/components/forms/results/Results';

export default async function Page({ params }: { params: { id: string } }) {
  await connect();

  const test = await Test.findById(params.id);

  return (
    <>
      <div className='page__title-button-container'>
        <div className='page__title-container'>
          <div className='page__title'>
            <span>{test.title}</span>
          </div>
        </div>
      </div>
      <div className='page__line' />
      <Results />
    </>
  );
}
