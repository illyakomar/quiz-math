import { HydratedDocument } from 'mongoose';
import TestForm from '@/components/forms/test/Test';
import TestTemplate, { TestTemplateInput } from '@/database/schemas/testTemplate.schema';
import connect from '@/database/config';
import TestControl from '@/components/testControl/TestControl';

export default async function Page({ params }: { params: { id: string } }) {
  await connect();

  const data = await TestTemplate.findById(params.id);
  const testTemplate = data.toObject({
    transform: (_: HydratedDocument<TestTemplateInput>, ret: Record<string, any>) => {
      ret._id = ret._id.toString();
      return ret;
    },
  });

  return (
    <>
      <div className='page__title-button-container'>
        <div className='page__title-container'>
          <div className='page__title'>
            <span>Інформація про тест</span>
          </div>
        </div>
        <TestControl _id={testTemplate?._id} testTemplate={testTemplate} />
      </div>
      <div className='page__line' />
      <TestForm mode='edit' {...testTemplate} />
    </>
  );
}
