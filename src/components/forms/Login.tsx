'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { LoginSchemaType } from '@/app/(auth)/login/types';
import { loginSchema } from '@/app/(auth)/login/schemas';

export default function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaType>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleLoginSubmit = async (data: LoginSchemaType) => {
    const result = await signIn('credentials', { ...data, redirect: false });
    console.log(result);
    if (result?.error) return;
    const callbackUrl = searchParams.get('callbackUrl') || '/created';
    router.replace(callbackUrl);
  };

  return (
    <form className='right-container__form' onSubmit={handleSubmit(handleLoginSubmit)}>
      <h2 className='right-container__form-title'>Вхід</h2>
      <hr className='right-container__form-divider' />
      <div className='right-container__form-inputs'>
        <Controller
          control={control}
          name='email'
          render={({ field: { onBlur, onChange, value } }) => (
            <Input
              type='email'
              name='email'
              label='Пошта'
              placeholder='email@gmail.com'
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              disabled={isSubmitting}
            />
          )}
        />
        <Controller
          control={control}
          name='password'
          render={({ field: { onBlur, onChange, value } }) => (
            <Input
              type='password'
              name='password'
              label='Пароль'
              placeholder='Введіть пароль'
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              disabled={isSubmitting}
            />
          )}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <div className='right-container__form-buttons'>
        <Button type='submit' color='primary'>
          Увійти
        </Button>
        <p className='right-container__form-buttons-divider'>
          <span className='right-container__form-buttons-divider-text'>Або</span>
        </p>
        <Button color='secondary' onClick={() => router.push('register')}>
          Реєстрація
        </Button>
      </div>
    </form>
  );
}
