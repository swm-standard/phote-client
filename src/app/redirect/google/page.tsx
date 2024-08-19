'use client';

import { Suspense, useEffect } from 'react';
import { googleLogin } from '@/app/redirect/login-api';
import { useSearchParams } from 'next/navigation';

const Content = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!searchParams.get('code')) return;
    (async () => {
      try {
        await googleLogin(searchParams.get('code')!);
      } catch (e) {
        console.error(`googleLogin failed by ${e}`);
      }
    })();
  }, []);

  return <div>Processing Google Login...</div>;
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <Content />
    </Suspense>
  );
}
