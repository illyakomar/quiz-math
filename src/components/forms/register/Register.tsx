'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { registerSchema } from '@/components/forms/register/schemas';
import { notifyError, notifyLoading, removeNotification } from '@/lib/helpers';
import { RegisterSchemaType } from './types';
import { UserApiService } from '@/lib/api/services/user.api-service';

export default function RegisterForm() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchemaType>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(registerSchema),
  });

  const router = useRouter();

  const handleRegisterSubmit = async (data: RegisterSchemaType): Promise<void> => {
    const notificationId = notifyLoading('Реєстрація...');
    const { email, password } = data;

    const response = await UserApiService.createOne(data);
    removeNotification(notificationId);
    if (response.error) {
      notifyError(response.error);
      return;
    }
    const result = await signIn('credentials', { email, password });
    if (result?.error) {
      notifyError(result.error);
      return;
    }
    router.push('/created');
  };

  return (
    <form className='right-container__form' onSubmit={handleSubmit(handleRegisterSubmit)}>
      <h2 className='right-container__form-title'>Реєстрація</h2>
      <hr className='right-container__form-divider' />
      <div className='right-container__form-inputs'>
        <div className='form-input'>
          <Controller
            control={control}
            name='firstName'
            defaultValue=''
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                type='text'
                name='firstName'
                label="Ім'я"
                placeholder="Введіть ім'я"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                disabled={isSubmitting}
              />
            )}
          />
          {errors.firstName && <p className='form-error'>{errors.firstName.message}</p>}
        </div>
        <div className='form-input'>
          <Controller
            control={control}
            name='lastName'
            defaultValue=''
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                type='text'
                name='lastName'
                label='Прізвище'
                placeholder='Введіть прізвище'
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                disabled={isSubmitting}
              />
            )}
          />
          {errors.lastName && <p className='form-error'>{errors.lastName.message}</p>}
        </div>
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
                type='text'
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
          Зареєструватися
        </Button>
        <Button color='secondary' onClick={() => router.push('login')}>
          Назад
        </Button>
      </div>
    </form>
  );
}
