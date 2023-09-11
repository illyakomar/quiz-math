'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { getProviders, signIn, useSession } from 'next-auth/react';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { LoginSchemaType } from './types';
import { loginSchema } from './schemas';

export default function Login() {
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

  const handleLoginSubmit = (data: LoginSchemaType) => {
    signIn('credentials', data);
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
