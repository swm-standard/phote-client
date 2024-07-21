'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const RedirectByAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const router = useRouter();

  if (isLoggedIn) router.replace('workbook');
  else return router.replace('register');
};

export default RedirectByAuth;
