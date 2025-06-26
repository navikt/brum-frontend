import Graph from '@/common/components/graph';

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Velkommen til Brum Dashboard!</p>
      <p>Her kan du se statistikk og annen informasjon.</p>

      <Graph filnavn="rkr" />
    </div>
  );
}
