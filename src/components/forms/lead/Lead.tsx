'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import { leadSchema } from '@/app/(test)/[id]/schemas';
import { LeadSchemaType } from '@/app/(test)/[id]/types';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface Props {
  title: string;
  onSuccessfullSubmit: (data: LeadSchemaType) => void;
}

export default function LeadForm(props: Props) {
  const { title, onSuccessfullSubmit } = props;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LeadSchemaType>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(leadSchema),
  });

  return (
    <form className='right-container__form' onSubmit={handleSubmit(onSuccessfullSubmit)}>
      <h2 className='right-container__form-title'>{title}</h2>
      <hr className='right-container__form-divider' />
      <div className='right-container__form-inputs'>
        <div className='form-input'>
          <Controller
            control={control}
            name='fullName'
            defaultValue=''
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                type='text'
                name='fullName'
                label="Ім'я та прізвище"
                placeholder="Введіть ім'я та прізвище"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                disabled={isSubmitting}
              />
            )}
          />
          {errors.fullName && <p className='form-error'>{errors.fullName.message}</p>}
        </div>
      </div>
      <div className='right-container__form-buttons'>
        <Button type='submit' color='primary'>
          Розпочати тестування
        </Button>
      </div>
    </form>
  );
}
