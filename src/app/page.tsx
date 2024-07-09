'use client';

import { useRouter } from 'next/navigation';

const Authenticate = () => {
  const isUser: boolean = true;
  const router = useRouter();

  if (isUser) router.push('/main/workbook');
  else router.push('/signinup');
};

export default Authenticate;
