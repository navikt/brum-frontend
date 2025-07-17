'use client';

import { UpdateDataOptionsProps } from '@/lib/types/propTypes';
import { Button, TextField, HStack } from '@navikt/ds-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { 
  FORSTE_AAR, 
  SISTE_AAR, 
  MAX_UKE_2025, 
  DEFAULT_MAX_UKE 
} from '@/lib/constants/dataMeny';

/**
 * Komponent for å velge år og uke for datavisning
 * 
 * @param dataParams - Nåværende valgte parametere
 * @param setDataParams - Funksjon for å oppdatere parametere
 */
const Datameny = ({ dataParams, setDataParams }: UpdateDataOptionsProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors: feil },
  } = useForm<{ aar: number; uke: number }>({
    reValidateMode: 'onBlur',
    shouldFocusError: false,
    defaultValues: {
      aar: dataParams.aar,
      uke: dataParams.uke,
    },
  });

  const overvåketÅr = watch('aar');

  const onSubmit: SubmitHandler<{ aar: number; uke: number }> = (data) => {
    setDataParams({ aar: data.aar, uke: data.uke });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HStack gap="4">
        <TextField
          id="velg-år"
          label="Velg år"
          htmlSize={4}
          error={feil.aar?.message}
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
          id="velg-uke"
          label="Velg uke"
          htmlSize={4}
          error={feil.uke?.message}
          {...register('uke', {
            required: 'Du må velge en gyldig uke.',
            pattern: {
              value: /^\d\d?$/,
              message: 'Uke må være 1 eller 2 siffer.',
            },
            min: { value: 1, message: 'Uke må være minst 1' },
            max: {
              value: overvåketÅr === SISTE_AAR ? MAX_UKE_2025 : DEFAULT_MAX_UKE,
              message:
                overvåketÅr === SISTE_AAR
                  ? 'Vi har kun data til uke 27 for 2025'
                  : 'Uke kan ikke være større enn 52',
            },
          })}
        />
        <Button type="submit" size="small">
          Velg
        </Button>
      </HStack>
    </form>
  );
};

export default Datameny;