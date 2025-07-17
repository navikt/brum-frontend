import { useEffect } from 'react';
import { useFetchDataProps } from '../lib/types/propTypes';

/**
 * Hook for å hente ukedata
 * 
 * @param setData - Callback for å sette data
 * @param dataParams - Parametere for datahenting (år og uke)
 */
export function useUkeData({ setData, dataParams }: useFetchDataProps) {
  useEffect(() => {
    fetch(`/api/ukeAntall?aar=${dataParams.aar}&uke=${dataParams.uke}`)
      .then((res) => {
        if (!res.ok) throw new Error('Kunne ikke hente ukedata');
        return res.json();
      })
      .then(setData)
      .catch(console.error);
  }, [dataParams]);
}