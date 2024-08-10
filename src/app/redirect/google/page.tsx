'use client';

import { useEffect } from 'react';

const Page = ({ searchParams }: { searchParams: { code: string } }) => {
  const getToken = async () => {
    try {
      const response = await fetch(
        `${process.env['NEXT_PUBLIC_BASE_URL']}/auth/google-login?code=${searchParams.code}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        },
      );

      const data = await response.json();
      console.log(data);

      return;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    (async () => {
      await getToken();
    })();
  }, []);

  return <div>Hello World</div>;
};

export default Page;
