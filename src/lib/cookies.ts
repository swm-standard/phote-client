import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';

const accessTokenKey: string = 'accessToken';
const refreshTokenKey: string = 'refreshToken';

export function setAccessToken(
  value: string,
  options?: Partial<ResponseCookie>,
) {
  return cookies().set(accessTokenKey, value, {
    secure: true,
    httpOnly: true,
    maxAge: parseInt(process.env['NEXT_PUBLIC_ACCESS_TOKEN_TTL']!, 10),
    ...options,
  });
}

export function setRefreshToken(
  value: string,
  options?: Partial<ResponseCookie>,
) {
  return cookies().set(refreshTokenKey, value, {
    secure: true,
    httpOnly: true,
    maxAge: parseInt(process.env['NEXT_PUBLIC_REFRESH_TOKEN_TTL']!, 10),
    ...options,
  });
}

export function getAccessToken() {
  return cookies().get(accessTokenKey)?.value;
}

export function getRefreshToken() {
  return cookies().get(refreshTokenKey)?.value;
}

export function clearTokens() {
  cookies().delete(accessTokenKey);
  cookies().delete(refreshTokenKey);
}
