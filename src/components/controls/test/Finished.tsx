'use client';

import { useRouter } from 'next/navigation';

import { TestApiService } from '@/lib/api/services/test.api-service';
import { TestOutput } from '@/database/test/schemas/test.schema';
import { notifySuccess, notifyError, notifyLoading } from '@/lib/helpers';
import ApiErrorMessageService from '@/lib/api/error-messages/api-error-message.service';
import Button from '../../ui/Button';

interface Props extends Pick<TestOutput, '_id'> {}

const FinishedTestControl = (props: Props) => {
  const { _id } = props;

  const router = useRouter();

  const handleStop = async () => {
    const notificationId = notifyLoading('Видалення тесту...');
    const result = await TestApiService.deleteOne(_id);
    if (result.error) {
      notifyError(ApiErrorMessageService.get(result.error.message), { id: notificationId });
      return;
    }
    notifySuccess('Тест успішно видалено!', { id: notificationId });
    router.push('/finished');
    router.refresh();
  };

  return (
    <div className='page__button-footer'>
      <Button color='secondary' onClick={handleStop}>
        Видалити
      </Button>
    </div>
  );
};

export default FinishedTestControl;
