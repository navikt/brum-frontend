import { useEffect } from 'react';

export default function fetchUkeAntall(arr: string, uke: string) {
  useEffect(() => {
    fetch(`/api/ukeAntalll?arr=${arr}uke=${uke}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.json();
      })
      .then((data) => {
        console.log('UKETALL', data.antall);
      })
      .catch(console.error);
  }, []);
}
