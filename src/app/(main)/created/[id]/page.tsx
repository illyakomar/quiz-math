import { HydratedDocument } from 'mongoose';
import TestForm from '@/components/forms/test/Test';
import TestTemplate, {
  TestTemplateInput,
} from '@/database/test-template/schemas/test-template.schema';
import TestControl from '@/components/testControl/TestControl';
import { connectDb } from '@/utils/middleware/middleware/connect-db.middleware';

export default async function CreatedTestTemplate({ params }: { params: { id: string } }) {
  await connectDb();

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
