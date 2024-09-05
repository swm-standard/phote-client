'use client';

import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import kakao from '@/static/images/kakao-login.png';
import google from '@/static/images/google-login.png';
import logo_character from '@/static/images/logo-character.png';
import logo_typo from '@/static/images/logo-typo.png';
import Container from '@/components/container';

const Page = () => {
  return (
    <Container className="flex flex-col">
      <section className="flex flex-grow flex-col items-center justify-center gap-2">
        <div className="relative flex w-48 flex-col items-center justify-center gap-8 text-brand-blue-heavy">
          <Image src={logo_character} alt="" width={150} height={150} />
          <Image src={logo_typo} alt="포테" width={100} height={100} />
        </div>
      </section>

      <section className="mb-10 flex w-full flex-col items-center justify-center gap-4 px-4">
        <Link
          href={`https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env['NEXT_PUBLIC_GOOGLE_API_KEY']}&response_type=code&redirect_uri=${process.env['NEXT_PUBLIC_LOGIN_REDIRECT_URL']}/redirect/google&scope=https://www.googleapis.com/auth/userinfo.email`}
          className="relative w-full"
        >
          <Image src={google} alt="구글 로그인" width={360} />
        </Link>
        <Link
          href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env['NEXT_PUBLIC_KAKAO_API_KEY']}&redirect_uri=${process.env['NEXT_PUBLIC_LOGIN_REDIRECT_URL']}/redirect/kakao&response_type=code`}
          className="relative w-full"
        >
          <Image src={kakao} alt="카카오 로그인" width={360} />
        </Link>
      </section>
    </Container>
  );
};

export default Page;
