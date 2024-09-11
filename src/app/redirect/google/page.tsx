'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Loading from '@/components/ui/loading';
import { googleLogin } from '@/api/auth-api';

const Content = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (!searchParams.get('code')) return;
    (async () => {
      try {
        await googleLogin(searchParams.get('code')!);
        router.push('/workbook');
      } catch (e) {
        console.error(`kakaoLogin failed by ${e}`);
      }
    })();
  }, []);

  return <Loading />;
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <Content />
    </Suspense>
  );
}
