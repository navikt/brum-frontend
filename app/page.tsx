import styles from './page.module.css';
import Graph from './graph';

const Home = () => {
  return (
    <main>
      <Graph filnavn="test.csv"></Graph>
    </main>
  );
};

export default Home;
