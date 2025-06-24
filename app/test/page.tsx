import { getOboToken } from '../pages/api/test';
import { headers } from 'next/headers';

const Test = async () => {
  const headerValues = await headers();
  const userToken = headerValues.get('authorization')?.replace('Bearer ', '');
  const token = await getOboToken(userToken);
  return (
    <main>
      <p>{token}</p>
    </main>
  );
};

export default Test;
