'use client';

import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import kakao from '@/static/images/kakao-login.png';
import google from '@/static/images/google-login.png';
import logo_character from '@/static/images/logo-character.png';
import logo_typo from '@/static/images/logo-typo.png';
import Container from '@/components/container';
import AppleLogin from '@/app/apple-login';
import { useMutation } from '@tanstack/react-query';
import { guestLogin } from '@/api/auth-api';
import { useRouter } from 'next/navigation';
import ProfileIcon from '@/static/icons/profile-icon';

const Page = () => {
  const mutation = useMutation({
    mutationFn: guestLogin,
  });

  const router = useRouter();
  const handleGuestLoginClick = async () => {
    try {
      await mutation.mutateAsync();
      router.replace('/workbook');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Container className="flex flex-col">
        <section className="mx-32 flex flex-grow flex-col items-center justify-center gap-2">
          <div className="relative w-full">
            <Image
              src={logo_character}
              alt=""
              layout="responsive"
              objectFit="contain"
            />
          </div>
          <div className="relative w-full">
            <Image
              src={logo_typo}
              alt="포테"
              layout="responsive"
              objectFit="contain"
            />
          </div>
        </section>

        <section className="mb-10 flex w-full flex-col items-center justify-center gap-4 px-4">
          <button
            className="relative flex h-full w-full items-center justify-center rounded-full bg-[#3AC6DB] px-7 py-3.5 text-lg font-semibold text-white"
            onClick={handleGuestLoginClick}
          >
            <ProfileIcon className="absolute left-7 flex h-6 w-6 items-center" />
            <p className="text-center">게스트 로그인</p>
          </button>

          <Link
            href={`https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env['NEXT_PUBLIC_GOOGLE_API_KEY']}&response_type=code&redirect_uri=${process.env['NEXT_PUBLIC_LOGIN_REDIRECT_URL']}/redirect/google&scope=https://www.googleapis.com/auth/userinfo.email`}
            className="relative h-fit w-full"
          >
            <Image
              src={google}
              alt="구글 로그인"
              layout="responsive"
              objectFit="contain"
            />
          </Link>
          <Link
            href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env['NEXT_PUBLIC_KAKAO_API_KEY']}&redirect_uri=${process.env['NEXT_PUBLIC_LOGIN_REDIRECT_URL']}/redirect/kakao&response_type=code`}
            className="relative w-full"
          >
            <Image
              src={kakao}
              alt="카카오 로그인"
              layout="responsive"
              objectFit="contain"
            />
          </Link>
          <AppleLogin />
        </section>
      </Container>
    </>
  );
};

export default Page;
