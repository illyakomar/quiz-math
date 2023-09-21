'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';

import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { RegisterSchemaType } from '@/app/(auth)/register/types';
import { registerSchema } from '@/app/(auth)/register/schemas';
import { notifyError, notifySuccess } from '@/lib/helpers';
import { Toaster } from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { ApiService } from '@/lib/api/services/api';

export default function RegisterForm() {
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
    const { email, password } = data;

    const response = await ApiService.post('/api/auth/register', data);
    if (response.error) {
      notifyError(response.error);
      return;
    }
    const result = await signIn('credentials', { email, password });
    if (result?.error) {
      notifyError(result.error);
      return;
    }
    notifySuccess('Успішна реєстрація!');
    response.status === 201 && router.push('/created');
  };

  return (
    <form className='right-container__form' onSubmit={handleSubmit(handleRegisterSubmit)}>
      <Toaster />
      <h2 className='right-container__form-title'>Реєстрація</h2>
      <hr className='right-container__form-divider' />
      <div className='right-container__form-inputs'>
        <div className='right-container__form-input'>
          <Controller
            control={control}
            name='firstName'
            //defaultValue=''
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
          {errors.firstName && (
            <p className='right-container__form-error'>{errors.firstName.message}</p>
          )}
        </div>
        <div className='right-container__form-input'>
          <Controller
            control={control}
            name='lastName'
            //defaultValue=''
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
          {errors.lastName && (
            <p className='right-container__form-error'>{errors.lastName.message}</p>
          )}
        </div>
        <div className='right-container__form-input'>
          <Controller
            control={control}
            name='email'
            //defaultValue=''
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
          {errors.email && <p className='right-container__form-error'>{errors.email.message}</p>}
        </div>
        <div className='right-container__form-input'>
          <Controller
            control={control}
            name='password'
            //defaultValue=''
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
          {errors.password && (
            <p className='right-container__form-error'>{errors.password.message}</p>
          )}
        </div>
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
