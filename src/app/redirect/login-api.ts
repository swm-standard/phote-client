'use server';

import { setAccessToken, setRefreshToken } from '@/util/cookies';
import { redirect } from 'next/navigation';

export async function kakaoLogin(authCode: string) {
  try {
    const response = await fetch(
      `${process.env['NEXT_PUBLIC_BASE_URL']}/api/auth/kakao-login?code=${authCode}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      },
    );

    if (!response.ok) {
      console.error(`[kakaoLogin] failed by status ${response.status}`);
      const json = await response.json();
      console.error(`- ${json.message}`);
    }

    const json = await response.json();
    const { accessToken, refreshToken } = json.data;
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
  } catch (e) {
    console.log(`@@@@@@@@[kakaoLogin] ${e}`);
    throw e;
  }
  redirect('/workbook');
}
