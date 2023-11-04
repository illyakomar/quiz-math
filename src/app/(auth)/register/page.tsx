import RegisterForm from '@/components/forms/register/Register';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Login() {
  const session = await getServerSession();

  if (session) redirect('/created');

  return <RegisterForm />;
}
