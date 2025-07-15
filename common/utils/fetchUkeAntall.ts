import { useEffect } from 'react';
import { useFetchDataProps } from '../types/propTypes';

export default function useFetchUkeAntall({ setData, dataParams }: useFetchDataProps) {
  useEffect(() => {
    fetch(`/api/ukeAntall?aar=${dataParams.aar}&uke=${dataParams.uke}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.json();
      })
      .then(setData)
      .catch(console.error);
  }, [dataParams]);
}
