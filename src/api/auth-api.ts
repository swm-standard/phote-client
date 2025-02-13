export const logout = async () => {
  const response = await fetch('/api/auth/logout', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');

  const jsonResponse = await response.json();
  return jsonResponse.data;
};

export const unregister = async () => {
  const response = await fetch('/api/member', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  const jsonResponse = await response.json();
  return jsonResponse.data;
};

export async function kakaoLogin(authCode: string) {
  const response = await fetch('/api/auth/kakao-login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      code: authCode,
      redirectUri: `${process.env['NEXT_PUBLIC_LOGIN_REDIRECT_URL']}/redirect/kakao`,
    }),
  });

  const jsonResponse = await response.json();
  localStorage.setItem('accessToken', jsonResponse.data.accessToken);
  localStorage.setItem('refreshToken', jsonResponse.data.refreshToken);
  return jsonResponse.data;
}

export async function googleLogin(authCode: string) {
  const response = await fetch(`/api/auth/google-login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      code: authCode,
      redirectUri: `${process.env['NEXT_PUBLIC_LOGIN_REDIRECT_URL']}/redirect/google`,
    }),
  });

  const jsonResponse = await response.json();
  localStorage.setItem('accessToken', jsonResponse.data.accessToken);
  localStorage.setItem('refreshToken', jsonResponse.data.refreshToken);
  return jsonResponse.data;
}

export async function appleLogin(authCode: string) {
  const response = await fetch(`/api/auth/apple-login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      code: authCode,
      redirectUri: `${process.env['NEXT_PUBLIC_LOGIN_REDIRECT_URL']}`,
    }),
  });

  const jsonResponse = await response.json();
  localStorage.setItem('accessToken', jsonResponse.data.accessToken);
  localStorage.setItem('refreshToken', jsonResponse.data.refreshToken);
  return jsonResponse.data;
}

export async function guestLogin() {
  const response = await fetch(`/api/auth/native-login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: `${process.env['NEXT_PUBLIC_GUEST_ID']}`,
      password: `${process.env['NEXT_PUBLIC_GUEST_PW']}`,
    }),
  });

  const jsonResponse = await response.json();
  localStorage.setItem('accessToken', jsonResponse.data.accessToken);
  localStorage.setItem('refreshToken', jsonResponse.data.refreshToken);
  return jsonResponse.data;
}
