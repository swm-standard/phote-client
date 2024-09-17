'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Loading from '@/components/ui/loading';
import { useQuery } from '@tanstack/react-query';
import { googleLogin } from '@/api/auth-api';

const Content = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const code = searchParams.get('code');
  const loginQuery = useQuery({
    queryKey: ['kakaoLogin'],
    queryFn: () => googleLogin(code!),
    enabled: !!code,
  });

  useEffect(() => {
    if (loginQuery.isSuccess) {
      router.push('/workbook');
    } else if (loginQuery.isError) {
      router.push('/error');
    }
  }, [loginQuery.isSuccess, loginQuery.isError, router]);

  if (loginQuery.isFetching) return <Loading />;
  return null;
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <Content />
    </Suspense>
  );
}
