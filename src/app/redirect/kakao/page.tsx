'use client';

import { useEffect } from 'react';
import { kakaoLogin } from '@/app/redirect/login-api';
import { useRouter } from 'next/navigation';

export default function Page({
  searchParams,
}: {
  searchParams: { code: string };
}) {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        await kakaoLogin(searchParams.code);
        // router.replace('/workbook');
      } catch (e) {
        console.error(`kakaoLogin failed by ${e}`);
      }
    })();
  }, [searchParams.code]);

  return <div>Processing login...</div>;
}

// import { kakaoLogin } from '@/app/redirect/login-api';
//
// const Page = async ({ searchParams }: { searchParams: { code: string } }) => {
//   await kakaoLogin(searchParams.code);
// };
//
// export default Page;
