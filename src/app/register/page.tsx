'use client';

import React from 'react';
import Link from 'next/link';

const Page = () => {
  const api = process.env.NEXT_PUBLIC_BASE_URL + '/auth/kakao-login';

  const bamb = async () => {
    try {
      const res = await fetch(api, {
        method: 'GET',
      });

      console.log(await res.json());
    } catch (e) {
      console.log('로그인 실패', e);
    }
  };

  return (
    <div className="flex flex-col">
      <button
        className="border-1 border-black bg-green-400 p-4"
        onClick={() => bamb()}
      >
        Get요청
      </button>
      <Link className="border-1 border-black bg-pink-400 p-4" href={api}>
        url이동
      </Link>
    </div>
  );
};

export default Page;
