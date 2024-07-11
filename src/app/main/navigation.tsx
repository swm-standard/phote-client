'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavigationItem {
  path: string;
  buttonText: string;
}

const navigationList: NavigationItem[] = [
  {
    path: '/main/workbook',
    buttonText: '문제집',
  },
  {
    path: '/main/question',
    buttonText: '문제',
  },
  {
    path: '/main/share',
    buttonText: '공유',
  },
  {
    path: '/main/mypage',
    buttonText: '마이페이지',
  },
];

const Navigation = () => {
  const path = usePathname();

  return (
    <ul className="flex flex-row justify-between w-full fixed bg-red-500 left-0 bottom-0">
      {navigationList.map((item, idx) => {
        const isSelected = path === item.path;

        if (isSelected)
          return <li className="text-green-500">{item.buttonText}</li>;
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
