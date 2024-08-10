'use server';

import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
} from '@/util/cookies';
import { AuthError } from '@/model/c-error';
import { redirect } from 'next/navigation';

async function refresh() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) throw new AuthError('[refresh] failed');

  try {
    const response = await fetch(
      `${process.env['NEXT_PUBLIC_BASE_URL']}/token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          refreshToken: refreshToken!,
        },
      },
    );

    if (!response.ok && response.status === 403) {
      throw new AuthError('[refresh] failed');
    }

    const json = await response.json();
    setAccessToken(json.data.accessToken);
  } catch (e) {
    throw e;
  }
}

async function tryAuthFetch(apiUrl: string, options: RequestInit) {
  const accessToken = getAccessToken();
  // if (!accessToken) throw new AuthError('[tryAuthFetch] failed');

  try {
    const response = await fetch(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        accessToken: accessToken!,
      },
      ...options,
    });

    if (!response.ok && response.status === 403) {
      throw new AuthError('[tryAuthFetch] failed');
    }

    return await response.json();
  } catch (e) {
    throw e;
  }
}

async function authFetch(apiUrl: string, options: RequestInit) {
  let redirectFlag = false;
  try {
    return await tryAuthFetch(apiUrl, options); // 1차 시도
  } catch (e) {
    if (e instanceof AuthError) {
      try {
        await refresh();
        return await tryAuthFetch(apiUrl, options); // 2차 시도
      } catch (e) {
        if (e instanceof AuthError) {
          redirectFlag = true; // Auth 관련 2차 실패
          clearTokens();
        } else throw e;
      }
    } else throw e;
  }

  // https://github.com/vercel/next.js/discussions/64993
  // 아마 지금 refrestoken마저 없으면 middleware에서 걸려서 저 redirection이 안될거임..

  if (redirectFlag) redirect('/register');
}

export default authFetch;
