'use client'
import Graph from '@/common/components/graph';
import { useEffect, useState } from 'react';
import { logger } from '@navikt/next-logger';
import { Loader } from '@navikt/ds-react';

export default function Dashboard() {
  const [data, setData] = useState<Object[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("/api/gjennomforinger");
        if (!response.ok) throw new Error("Failed to fetch user info");
        const data = await response.json();
        setData(data);
      } catch (error) {
        logger.warn("Not logged in, can't render user info");
        console.error(error);
        setLoading(true);
      }
    };
    fetchUserInfo();
  }, []);


    if(loading){
      return <Loader />;
    }

    console.log(data);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Velkommen til Brum Dashboard!</p>
      <p>Her kan du se statistikk og annen informasjon.</p>

      <Graph />
    </div>
  );
}
