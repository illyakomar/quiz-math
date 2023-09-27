import QuestionInfo from '@/components/forms/questionInfo/QuestionInfo';
import TestTemplate from '@/database/models/testTemplate.model';
import connect from '@/database/connection';
import TestControl from '@/components/testControl/TestControl';

export default async function Page({ params }: { params: { id: string } }) {
  await connect();

  const test = await TestTemplate.findById(params.id);

  return (
    <>
      <div className='page__title-button-container'>
        <div className='page__title-container'>
          <div className='page__title'>
            <span>Інформація про тест</span>
          </div>
        </div>
        <TestControl />
      </div>
      <div className='page__line' />
      <QuestionInfo id={test._id.toString()} name={test.title} question={[]} />
    </>
  );
}
