import { NextRequest } from 'next/server';
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
} from '@/util/cookies';
import { AuthError } from '@/model/c-error';

export async function GET(request: NextRequest) {
  const response = await authFetch(generateUrl(request), {
    method: 'GET',
  });

  if (!response.ok) {
    console.error(`[GET] failed by status ${response.status}`);
    const json = await response.json();
    console.error(`- ${json.message}`);
  }

  return response;
}

export async function DELETE(request: NextRequest) {
  const response = await authFetch(generateUrl(request), {
    method: 'DELETE',
  });

  if (!response.ok) {
    console.error(`[DELETE] failed by status ${response.status}`);
    const json = await response.json();
    console.error(`- ${json.message}`);
  }

  return response;
}

export async function POST(request: NextRequest) {
  console.log('-------------------');
  const body = await request.json();
  console.log('-------------------');
  const response = await authFetch(generateUrl(request), {
    method: 'POST',
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    console.error(`[POST] failed by status ${response.status}`);
    const json = await response.json();
    console.error(`[POST] failed by message ${json.message}`);
  }

  return response;
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const response = await authFetch(generateUrl(request), {
    method: 'PUT',
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    console.error(`[PUT] failed by status ${response.status}`);
    const json = await response.json();
    console.error(`- ${json.message}`);
  }

  return response;
}

function generateUrl(request: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
  const path = request.nextUrl.pathname;
  const queryParams = request.nextUrl.searchParams.toString();

  return queryParams ? `${baseUrl}${path}?${queryParams}` : `${baseUrl}${path}`;
}

async function authFetch(apiUrl: string, options: RequestInit) {
  try {
    return await tryAuthFetch(apiUrl, options); // 1차 시도
  } catch (e) {
    if (e instanceof AuthError) {
      try {
        await refresh();
        return await tryAuthFetch(apiUrl, options); // 2차 시도
      } catch (e) {
        if (e instanceof AuthError) clearTokens();
        throw e; // 2차 실패 원인
      }
    }
    throw e; // 1차 실패 원인
  }
}

async function tryAuthFetch(apiUrl: string, options: RequestInit) {
  const accessToken = getAccessToken();
  const response = await fetch(apiUrl, {
    headers: {
      // 'Content-Type': 'application/json',
      accessToken: accessToken!,
    },
    ...options,
  });

  if (!response.ok && response.status === 403) {
    throw new AuthError('[tryAuthFetch] failed');
  }

  return response;
}

async function refresh() {
  const refreshToken = getRefreshToken();
  const response = await fetch(`${process.env['NEXT_PUBLIC_BASE_URL']}/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      refreshToken: refreshToken!,
    },
  });

  if (!response.ok && response.status === 403) {
    throw new AuthError('[refresh] failed');
  }

  const json = await response.json();
  setAccessToken(json.data.accessToken);
}
