'use client';

import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { loginSchema } from '@/components/forms/login/schemas';
import { notifyError } from '@/lib/helpers';
import { LoginSchemaType } from './types';

export default function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaType>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleLoginSubmit = async (data: LoginSchemaType) => {
    const result = await signIn('credentials', { ...data, redirect: false });
    if (result?.error) {
      notifyError(result.error);
      return;
    }
    const callbackUrl = searchParams.get('callbackUrl') || '/created';
    router.replace(callbackUrl);
  };

  return (
    <form className='right-container__form' onSubmit={handleSubmit(handleLoginSubmit)}>
      <Toaster />
      <h2 className='right-container__form-title'>Вхід</h2>
      <hr className='right-container__form-divider' />
      <div className='right-container__form-inputs'>
        <div className='form-input'>
          <Controller
            control={control}
            name='email'
            defaultValue=''
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                type='email'
                name='email'
                label='Пошта'
                placeholder='email@gmail.com'
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                disabled={isSubmitting}
              />
            )}
          />
          {errors.email && <p className='form-error'>{errors.email.message}</p>}
        </div>
        <div className='form-input'>
          <Controller
            control={control}
            name='password'
            defaultValue=''
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                type='password'
                name='password'
                label='Пароль'
                placeholder='Введіть пароль'
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                disabled={isSubmitting}
              />
            )}
          />
          {errors.password && <p className='form-error'>{errors.password.message}</p>}
        </div>
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
