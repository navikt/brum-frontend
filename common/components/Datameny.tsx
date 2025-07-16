'use client';

import { VStack, Button, TextField } from '@navikt/ds-react';
import { UpdateDataOptionsProps } from '../types/propTypes';
import { SubmitHandler, useForm } from 'react-hook-form';

const Datameny = ({ dataParams, setDataParams }: UpdateDataOptionsProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<{ aar: number; uke: number }>({
    reValidateMode: 'onBlur',
    shouldFocusError: false,
    defaultValues: {
      aar: dataParams.aar,
      uke: dataParams.uke,
    },
  });

  const watchedAar = watch('aar');

  // flere grenseverdier er hardkoda her, rett og slett fordi det er begrensingene til data settet vi operer med nå
  const FORSTE_AAR = 2022;
  const SISTE_AAR = 2025;
  const MAX_UKE_2025 = 27;
  const DEFAULT_MAX_UKE = 52;

  const onSubmit: SubmitHandler<{ aar: number; uke: number }> = (data) => {
    setDataParams({ aar: data.aar, uke: data.uke });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack gap="4">
        <TextField
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
            min: { value: FORSTE_AAR, message: 'Vi har foreløpig ikke data fra før 2022' },
            max: { value: SISTE_AAR, message: 'Vi kjenner ikke framtida.' },
          })}
        />
        <TextField
          id="velg uke"
          label="Velg uke"
          htmlSize={4}
          error={errors.uke?.message}
          {...register('uke', {
            required: 'Du må velge en gyldig uke.',
            pattern: {
              value: /^\d\d?$/,
              message: 'Uke må være 1 eller 2 siffer.',
            },
            min: { value: 1, message: 'Uke må være minst 1' },
            max: {
              value: watchedAar === SISTE_AAR ? MAX_UKE_2025 : DEFAULT_MAX_UKE,
              message:
                watchedAar === SISTE_AAR
                  ? 'Vi har kun data til uke 27 for 2025'
                  : 'Uke kan ikke være større enn 52',
            },
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
