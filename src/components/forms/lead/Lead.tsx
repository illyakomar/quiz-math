'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';

import { leadSchema } from '@/app/(test)/test/schemas';
import { LeadSchemaType } from '@/app/(test)/test/types';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface Props {
  name: string;
  onClick: () => void;
}

export default function LeadForm(props: Props) {
  const { name, onClick } = props;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LeadSchemaType>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: zodResolver(leadSchema),
  });

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleLoginSubmit = async (data: LeadSchemaType) => {
    onClick();
  };

  return (
    <form className='right-container__form' onSubmit={handleSubmit(handleLoginSubmit)}>
      <h2 className='right-container__form-title'>{name}</h2>
      <hr className='right-container__form-divider' />
      <div className='right-container__form-inputs'>
        <Controller
          control={control}
          name='name'
          render={({ field: { onBlur, onChange, value } }) => (
            <Input
              name='name'
              label='Прізвище та ім’я'
              placeholder='Ваше прізвище та ім’я'
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              disabled={isSubmitting}
            />
          )}
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div className='right-container__form-buttons'>
        <Button type='submit' color='primary'>
          Приєднатися
        </Button>
      </div>
    </form>
  );
}
