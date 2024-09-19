import React, { useState } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/navigation';

// interface AppleIDSignInOnFailure extends Event {
//   detail: {
//     error: Error;
//   };
// }

const AppleLogin = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleAppleScriptLoad = () => {
    // @ts-expect-error fix apple login
    const apple = window['AppleID'];
    if (!apple) return;

    console.log(`${window.location.origin}${window.location.pathname}`);

    apple.auth.init({
      clientId: process.env['NEXT_PUBLIC_APPLE_API_KEY'],
      scope: 'name email',
      redirectURI: `${process.env['NEXT_PUBLIC_LOGIN_REDIRECT_URL']}`,
      state: 'siginin',
      usePopup: true,
    });
    // 애플로 로그인 성공

    document.addEventListener(
      'AppleIDSignInOnSuccess',
      handleAppleCredentialResponse,
    );
    // 애플로 로그인 실패
    document.addEventListener('AppleIDSignOnFailure', () =>
      console.error('apple 로그인 실패'),
    );

    setIsLoaded(true);
  };

  const router = useRouter();
  // @ts-expect-error fix apple login
  const handleAppleCredentialResponse = async (e) => {
    // console.log(e.detail.authorization);
    router.push(`/redirect/apple?code=${e.detail.authorization.code}`);
  };

  return (
    <>
      <Script
        src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/ko_KR/appleid.auth.js"
        onLoad={handleAppleScriptLoad}
      />
      <div
        className="button-apple"
        style={{ visibility: isLoaded ? 'visible' : 'hidden' }}
      >
        <div
          id="appleid-signin"
          data-color="black"
          data-type="continue"
          data-mode="left-align"
          data-width="323"
          data-height="36"
          data-border="true"
          data-border-radius="50"
          data-logo-size="medium"
          data-logo-position="15"
          data-label-position="115"
          style={{
            width: 323,
            height: 36,
          }}
        />
      </div>
    </>
  );
};

export default AppleLogin;
