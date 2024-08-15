'use client';

import { Suspense, useEffect } from 'react';
import { kakaoLogin } from '@/app/redirect/login-api';
import { useSearchParams } from 'next/navigation';

const Content = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!searchParams.get('code')) return;
    (async () => {
      try {
        await kakaoLogin(searchParams.get('code')!);
      } catch (e) {
        console.error(`kakaoLogin failed by ${e}`);
      }
    })();
  }, []);

  return <div>Processing login...</div>;
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <Content />
    </Suspense>
  );
}
