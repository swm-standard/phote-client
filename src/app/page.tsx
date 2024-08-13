'use client';

import React from 'react';
import Link from 'next/link';

const Page = () => {
  return (
    <div className="flex flex-col">
      <Link
        href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env['NEXT_PUBLIC_KAKAO_API_KEY']}&redirect_uri=https://pho-te.com/redirect/kakao&response_type=code`}
        className="border-1 border-black bg-green-400 p-4"
      >
        카카오 로그인
      </Link>
      <Link
        href={`https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env['NEXT_PUBLIC_GOOGLE_API_KEY']}&response_type=code&redirect_uri=http://localhost:3000/redirect/google&scope=https://www.googleapis.com/auth/userinfo.email`}
        className="border-1 border-black bg-green-400 p-4"
      >
        구글 로그인
      </Link>
    </div>
  );
};

export default Page;
