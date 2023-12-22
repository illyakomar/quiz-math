import { notFound } from 'next/navigation';
import { Toaster } from 'react-hot-toast';

import { TestOutput } from '@/database/test/schemas/test.schema';
import TestService from '@/database/test/test.service';
import TestingWindow from '../../../components/windows/testing/Testing';

import '@/styles/components/_testing.scss';

export default async function Test({ params }: { params: { id: string } }) {
  let test: TestOutput;

  try {
    test = await TestService.selectOne({ _id: params.id, status: 'ACTIVE' }, {}, { owner: 0 });
  } catch {
    notFound();
  }

  return (
    <>
      <Toaster />
      <TestingWindow {...test} />
    </>
  );
}
