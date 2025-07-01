import { useEffect } from 'react';

export function useFetchTestData(setData: Function, setLoading: Function, setChartOptions: any) {
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/testData`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch(console.error);
  }, [setData]);
}

export function updateGraphSeries(data: any, setChartOptions: Function, setLoading: any) {
  console.log(data);
  setChartOptions((prev: any) => ({
    ...prev,
    series: data.map((d: Object) => ({
      type: 'column',
      data: Object.values(d),
    })),
  }));
  data && data.length ? setLoading(false) : setLoading(true);
}
