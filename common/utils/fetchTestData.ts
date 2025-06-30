import { useEffect } from 'react';

export function useFetchTestData(setChartOptions: Function, setLoading: Function) {
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/testData`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.json();
      })
      .then((data) => {
        setChartOptions((prev: any) => ({
          ...prev,
          series: data.map((d: Object) => ({
            type: 'column',
            data: Object.values(d),
          })),
        }));
        setLoading(false);
      })
      .catch(console.error);
  }, [setChartOptions]);
}
