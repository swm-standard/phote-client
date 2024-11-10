// import React, { useRef, useState } from 'react';
// import Script from 'next/script';
// import { useRouter } from 'next/navigation';
// import apple from '@/static/images/apple-login.png';
// import Image from 'next/image';
//
// // interface AppleIDSignInOnFailure extends Event {
// //   detail: {
// //     error: Error;
// //   };
// // }
//
// const AppleLogin = () => {
//   const [isLoaded, setIsLoaded] = useState(false);
//
//   const handleAppleScriptLoad = () => {
//     // @ts-expect-error fix apple login
//     const apple = window['AppleID'];
//     if (!apple) return;
//
//     apple.auth.init({
//       clientId: process.env['NEXT_PUBLIC_APPLE_API_KEY'],
//       scope: 'name email',
//       redirectURI: `${process.env['NEXT_PUBLIC_LOGIN_REDIRECT_URL']}`,
//       state: 'siginin',
//       usePopup: true,
//     });
//     // 애플로 로그인 성공
//
//     document.addEventListener(
//       'AppleIDSignInOnSuccess',
//       handleAppleCredentialResponse,
//     );
//     // 애플로 로그인 실패
//     document.addEventListener('AppleIDSignOnFailure', () =>
//       console.error('apple 로그인 실패'),
//     );
//
//     setIsLoaded(true);
//   };
//
//   const router = useRouter();
//   // @ts-expect-error fix apple login
//   const handleAppleCredentialResponse = async (e) => {
//     // console.log(e.detail.authorization);
//     router.push(`/redirect/apple?code=${e.detail.authorization.code}`);
//   };
//
//   const appleButtonRef = useRef(null);
//   const handleCustomButtonClick = () => {
//     if (appleButtonRef.current) {
//       // @ts-expect-error fix apple login
//       appleButtonRef.current.click(); // 숨겨진 Apple 로그인 버튼을 클릭
//     }
//   };
//
//   return (
//     <>
//       <Script
//         src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/ko_KR/appleid.auth.js"
//         onLoad={handleAppleScriptLoad}
//       />
//       <div
//         className="w-full"
//         style={{ visibility: isLoaded ? 'visible' : 'hidden' }}
//       >
//         <div
//           ref={appleButtonRef}
//           id="appleid-signin"
//           style={{ display: 'none' }}
//           data-color="black"
//           data-type="continue"
//           data-mode="left-align"
//           data-width="323"
//           data-height="36"
//         />
//         <Image
//           onClick={handleCustomButtonClick}
//           className="cursor-pointer"
//           src={apple}
//           alt="애플 로그인"
//           layout="responsive"
//           objectFit="contain"
//         />
//       </div>
//     </>
//   );
// };
//
// export default AppleLogin;

import React, { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import AppleLoginIcon from '@/static/icons/apple-login';

// 전역 변수로 스크립트 로드 상태 관리
let isAppleScriptLoaded = false;

const AppleLogin = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();
  const appleButtonRef = useRef(null);

  const initializeAppleLogin = () => {
    // @ts-expect-error fix apple login
    const apple = window['AppleID'];
    if (!apple) return;

    apple.auth.init({
      clientId: process.env.NEXT_PUBLIC_APPLE_API_KEY,
      scope: 'name email',
      redirectURI: `${process.env.NEXT_PUBLIC_LOGIN_REDIRECT_URL}`,
      state: 'signin',
      usePopup: true,
    });

    document.addEventListener(
      'AppleIDSignInOnSuccess',
      handleAppleCredentialResponse,
    );
    document.addEventListener('AppleIDSignOnFailure', () =>
      console.error('Apple login failed'),
    );

    setIsInitialized(true);
  };

  const handleAppleScriptLoad = () => {
    isAppleScriptLoaded = true;
    initializeAppleLogin();
  };

  useEffect(() => {
    if (isAppleScriptLoaded) {
      initializeAppleLogin();
    }

    // Cleanup function
    return () => {
      document.removeEventListener(
        'AppleIDSignInOnSuccess',
        handleAppleCredentialResponse,
      );
      document.removeEventListener('AppleIDSignOnFailure', () =>
        console.error('Apple login failed'),
      );
    };
  }, []); // Re-run effect when route changes
  // @ts-expect-error fix apple login
  const handleAppleCredentialResponse = async (e) => {
    router.push(`/redirect/apple?code=${e.detail.authorization.code}`);
  };

  const handleCustomButtonClick = () => {
    if (appleButtonRef.current) {
      // @ts-expect-error fix apple login
      appleButtonRef.current.click();
    }
  };

  return (
    <>
      {!isAppleScriptLoaded && (
        <Script
          src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/ko_KR/appleid.auth.js"
          onLoad={handleAppleScriptLoad}
        />
      )}
      <div
        className="w-full"
        style={{ visibility: isInitialized ? 'visible' : 'hidden' }}
      >
        <div
          ref={appleButtonRef}
          id="appleid-signin"
          style={{ display: 'none' }}
          data-color="black"
          data-type="continue"
          data-mode="left-align"
          data-width="323"
          data-height="36"
        />
        <span onClick={handleCustomButtonClick} className="cursor-pointer">
          <AppleLoginIcon className="w-full" />
        </span>
      </div>
    </>
  );
};

export default AppleLogin;
