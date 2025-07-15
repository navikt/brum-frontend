'use client';

import { VStack, Button, TextField } from '@navikt/ds-react';
import { UpdateDataOptionsProps } from '../types/propTypes';
import { SubmitHandler, useForm } from 'react-hook-form';

const Datameny = ({ dataParams, setDataParams }: UpdateDataOptionsProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ aar: number; uke: number }>({
    reValidateMode: 'onBlur',
    shouldFocusError: false,
  });

  const onSubmit: SubmitHandler<{ aar: number; uke: number }> = (data) => {
    setDataParams({ aar: data.aar, uke: data.uke });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack gap="4">
        <TextField
          defaultValue={dataParams.aar}
          id="velg år"
          label="Velg år"
          htmlSize={4}
          error={errors.aar?.message}
          {...register('aar', {
            required: 'Du må velge et gyldig år.',
            pattern: {
              value: /^\d{4}$/,
              message: 'År må være 4 siffer.',
            },
            min: { value: 2022, message: 'Vi har foreløpig ikke data fra før 2022' },
            max: { value: 2025, message: 'Vi kjenner ikke framtida.' },
          })}
        />
        <TextField
          defaultValue={dataParams.uke}
          id="velg uke"
          label="Velg uke"
          htmlSize={4}
          error={errors.uke?.message}
          {...register('uke', {
            required: 'Du må velge en gyldig uke.',
            pattern: {
              value: /^\d\d?$/,
              message: 'År må være 1-2 siffer.',
            },
            min: { value: 1, message: 'Uke må være minst 1' },
            max: { value: 52, message: 'Uke kan ikke være større enn 52' },
          })}
        />
        <Button type="submit" size="small">
          Velg
        </Button>
      </VStack>
    </form>
  );
};

export default Datameny;
