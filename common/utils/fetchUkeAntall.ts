



export default async function fetchUkeAntall(arr: string, uke:string): Promise<number> {

  const response = await fetch(`/api/ukeAntalll?arr=${arr}uke=${uke}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch uke antall for week ${uke}`);
  }

  console.log(`Response status: ${response.status}`);
  const data = await response.json();
  return data.antall;
}