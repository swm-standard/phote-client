'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MAIN_ROUTES } from '@/app/routing';

interface NavigationItem {
  path: string;
  buttonText: string;
}

const navigationList: NavigationItem[] = [
  {
    path: MAIN_ROUTES.workbook,
    buttonText: '문제집',
  },
  {
    path: MAIN_ROUTES.question,
    buttonText: '문제',
  },
  {
    path: MAIN_ROUTES.share,
    buttonText: '공유',
  },
  {
    path: MAIN_ROUTES.mypage,
    buttonText: '마이페이지',
  },
];

const Navigation = () => {
  const path = usePathname();

  return (
    <ul className="flex flex-row justify-between w-full absolute bg-red-500 left-0 bottom-0">
      {navigationList.map((item, idx) => {
        const isSelected = path === item.path;

        if (isSelected)
          return (
            <li key={idx} className="text-green-500">
              {item.buttonText}
            </li>
          );
        else
          return (
            <li key={idx}>
              <Link key={idx} href={item.path}>
                {item.buttonText}
              </Link>
            </li>
          );
      })}
    </ul>
  );
};

export default Navigation;
