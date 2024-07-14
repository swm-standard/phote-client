'use client';

import { useRouter } from 'next/navigation';
import { MAIN_ROUTES } from '@/app/routing';

const Authenticate = () => {
  const isUser: boolean = true;
  const router = useRouter();

  if (isUser) router.push(MAIN_ROUTES.workbook);
  else router.push('/signinup');
};

export default Authenticate;
