'use server';

import { setAccessToken, setRefreshToken } from '@/util/cookies';
import { redirect } from 'next/navigation';

export async function kakaoLogin(authCode: string) {
  try {
    const response = await fetch(
      `${process.env['NEXT_PUBLIC_BASE_URL']}/auth/kakao-login?code=${authCode}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      },
    );

    const { accessToken, refreshToken } = (await response.json()).data;
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
  } catch (e) {
    throw e;
  }
  redirect('/workbook');
}
