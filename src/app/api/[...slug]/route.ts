import { NextRequest } from 'next/server';
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
} from '@/lib/cookies';
import { AuthError } from '@/model/c-error';

export async function GET(request: NextRequest) {
  return await authFetch(generateUrl(request), {
    method: 'GET',
  });
}

export async function DELETE(request: NextRequest) {
  return await authFetch(generateUrl(request), {
    method: 'DELETE',
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return await authFetch(generateUrl(request), {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  return await authFetch(generateUrl(request), {
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  return await authFetch(generateUrl(request), {
    method: 'PATCH',
    body: JSON.stringify(body),
  });
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
        throw e;
      }
    }
    throw e;
  }
}

async function tryAuthFetch(apiUrl: string, options: RequestInit) {
  const accessToken = getAccessToken();
  const response = await fetch(apiUrl, {
    headers: {
      'Content-Type': 'application/json',
      accessToken: accessToken!,
    },
    ...options,
  });

  if (!response.ok) {
    if (response.status === 403) {
      throw new AuthError(`[tryAuthFetch] ${response.status} response`);
    } else {
      throw new Error(`[tryAuthFetch] ${response.status} response`);
    }
  }

  return response;
}

async function refresh() {
  const refreshToken = getRefreshToken();
  const response = await fetch(
    `${process.env['NEXT_PUBLIC_BASE_URL']}/api/auth/refreshtoken`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        refreshToken: refreshToken!,
      },
    },
  );

  if (response.status === 403) throw new AuthError('[refresh] failed');

  if (!response.ok) {
    console.error(`[refresh] failed by status ${response.status}`);
    const msg = await response.text();
    console.error(`[refresh] failed by message ${msg}`);
    throw new Error();
  }

  const json = await response.json();
  setAccessToken(json.data.accessToken);
}
