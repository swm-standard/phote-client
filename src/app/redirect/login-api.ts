export async function kakaoLogin(authCode: string) {
  try {
    const response = await fetch('/api/auth/kakao-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code: authCode,
        redirectUri: `${process.env['NEXT_PUBLIC_LOGIN_REDIRECT_URL']}/redirect/kakao`,
      }),
    });

    if (!response.ok) {
      const json = await response.json();
      console.error(`[kakaoLogin] failed with status ${response.status}`);
      console.error(`- ${json.message}`);
      throw new Error(json.message || 'An error occurred during Kakao login.');
    }

    const json = await response.json();
    const { accessToken, refreshToken } = json.data;

    localStorage.setItem('accessToken', accessToken);
  } catch (e) {
    console.error('An error occurred in kakaoLogin:', e);
    throw e;
  }
}

export async function googleLogin(authCode: string) {
  try {
    const response = await fetch(`/api/auth/google-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code: authCode,
        redirectUri: `${process.env['NEXT_PUBLIC_LOGIN_REDIRECT_URL']}/redirect/google`,
      }),
    });

    if (!response.ok) {
      const json = await response.json();
      console.error(`[googleLogin] failed with status ${response.status}`);
      console.error(`- ${json.message}`);
      throw new Error(json.message || 'An error occurred during Google login.');
    }

    return await response.json();
  } catch (e) {
    console.error('An error occurred in googleLogin:', e);
    throw e;
  }
}
