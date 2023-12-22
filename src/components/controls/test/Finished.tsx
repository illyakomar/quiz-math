'use client';

import { useRouter } from 'next/navigation';

import Button from '../../ui/Button';
import { TestApiService } from '@/lib/api/services/test.api-service';
import { TestOutput } from '@/database/test/schemas/test.schema';
import { notifySuccess, notifyError, notifyLoading, removeNotification } from '@/lib/helpers';

interface Props extends Pick<TestOutput, '_id'> {}

const FinishedTestControl = (props: Props) => {
  const { _id } = props;

  const router = useRouter();

  const handleStop = async () => {
    const notificationId = notifyLoading('Видалення тесту...');
    const result = await TestApiService.deleteOne(_id);
    removeNotification(notificationId);
    if (result.error) {
      notifyError(result.error);
      return;
    }
    notifySuccess('Тест успішно видалено!');
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
