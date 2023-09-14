'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { redirect, useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';

import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { RegisterSchemaType } from './types';
import { registerSchema } from './schemas';

export default function Register() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchemaType>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: zodResolver(registerSchema),
  });

  const router = useRouter();

  const handleRegisterSubmit = async (data: RegisterSchemaType): Promise<void> => {
    const { firstName, lastName, email, password } = data;

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });
      res.status === 201 && router.push('/created');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className='right-container__form' onSubmit={handleSubmit(handleRegisterSubmit)}>
      <h2 className='right-container__form-title'>Реєстрація</h2>
      <hr className='right-container__form-divider' />
      <div className='right-container__form-inputs'>
        <Controller
          control={control}
          name='firstName'
          render={({ field: { onBlur, onChange, value } }) => (
            <Input
              type='text'
              name='name'
              label="Ім'я"
              placeholder="Введіть ім'я"
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              disabled={isSubmitting}
            />
          )}
        />
        <Controller
          control={control}
          name='lastName'
          render={({ field: { onBlur, onChange, value } }) => (
            <Input
              type='text'
              name='lastname'
              label='Прізвище'
              placeholder='Введіть прізвище'
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              disabled={isSubmitting}
            />
          )}
        />
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
              type='text'
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
          Зареєструватися
        </Button>
        <Button color='secondary' onClick={() => router.push('login')}>
          Назад
        </Button>
      </div>
    </form>
  );
}
