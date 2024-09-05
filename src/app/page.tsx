'use client';

import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import kakao from '@/static/images/kakao-login.png';
import google from '@/static/images/google-login.png';
import Container from '@/components/container';

const Page = () => {
  return (
    <Container className="flex flex-col">
      <section className="flex flex-grow flex-col items-center justify-center gap-2">
        <div className="flex flex-col items-center justify-center gap-2 text-brand-blue-heavy">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="h-16 w-16"
          >
            <path d="M220.6 121.2L271.1 96 448 96l0 96-114.8 0c-21.9-15.1-48.5-24-77.2-24s-55.2 8.9-77.2 24L64 192l0-64 128 0c9.9 0 19.7-2.3 28.6-6.8zM0 128L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L271.1 32c-9.9 0-19.7 2.3-28.6 6.8L192 64l-32 0 0-16c0-8.8-7.2-16-16-16L80 32c-8.8 0-16 7.2-16 16l0 16C28.7 64 0 92.7 0 128zM168 304a88 88 0 1 1 176 0 88 88 0 1 1 -176 0z" />
          </svg>
          <h1 className="text-3xl font-bold">포테</h1>
        </div>
        <p className="text-sm font-normal text-text-003">
          나만의 문제집을 쉽고 빠르게
        </p>
      </section>

      <section className="mb-10 flex flex-col items-center justify-center gap-4">
        <Link
          href={`https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env['NEXT_PUBLIC_GOOGLE_API_KEY']}&response_type=code&redirect_uri=${process.env['NEXT_PUBLIC_LOGIN_REDIRECT_URL']}/redirect/google&scope=https://www.googleapis.com/auth/userinfo.email`}
        >
          <Image src={google} alt="구글 로그인" width={360} />
        </Link>
        <Link
          href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env['NEXT_PUBLIC_KAKAO_API_KEY']}&redirect_uri=${process.env['NEXT_PUBLIC_LOGIN_REDIRECT_URL']}/redirect/kakao&response_type=code`}
        >
          <Image src={kakao} alt="카카오 로그인" width={360} />
        </Link>
      </section>
    </Container>
  );
};

export default Page;
