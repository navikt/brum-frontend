import styles from './page.module.css';
import Graph from './graph';

const Home = () => {
  return (
    <main>
      <Graph data_url="https://demo-live-data.highcharts.com/vs-load.csv"></Graph>
    </main>
  );
};

export default Home;
