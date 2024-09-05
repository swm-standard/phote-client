'use client';

import { Suspense, useEffect } from 'react';
import { kakaoLogin } from '@/app/redirect/login-api';
import { useRouter, useSearchParams } from 'next/navigation';

const Content = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (!searchParams.get('code')) return;
    (async () => {
      try {
        await kakaoLogin(searchParams.get('code')!);
        router.push('/workbook');
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
