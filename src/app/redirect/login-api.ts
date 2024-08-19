'use server';

import { setAccessToken, setRefreshToken } from '@/util/cookies';
import { redirect } from 'next/navigation';

export async function kakaoLogin(authCode: string) {
  try {
    const response = await fetch(
      `${process.env['NEXT_PUBLIC_BASE_URL']}/api/auth/kakao-login`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: authCode,
          redirectUri: `${process.env['NEXT_PUBLIC_LOGIN_REDIRECT_URL']}/redirect/kakao`,
        }),
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
    console.log(e);
    throw e;
  }
  redirect('/workbook');
}

export async function googleLogin(authCode: string) {
  try {
    const response = await fetch(
      `${process.env['NEXT_PUBLIC_BASE_URL']}/api/auth/google-login`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: authCode,
          redirectUri: `${process.env['NEXT_PUBLIC_LOGIN_REDIRECT_URL']}/redirect/google`,
        }),
      },
    );

    if (!response.ok) {
      console.error(`[googleLogin] failed by status ${response.status}`);
      const json = await response.json();
      console.error(`- ${json.message}`);
    }

    const json = await response.json();
    const { accessToken, refreshToken } = json.data;
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
  } catch (e) {
    console.log(e);
    throw e;
  }
  redirect('/workbook');
}
