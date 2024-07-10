'use client';

import Link from 'next/link';
import { navigation, selectedNavigationItem } from '@/app/main/main.css';
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
    <ul className={navigation}>
      {navigationList.map((item, idx) => {
        const isSelected = path === item.path;

        if (isSelected) return item.buttonText;
        else
          return (
            <li key={idx}>
              <Link
                className={isSelected ? selectedNavigationItem : ''}
                key={idx}
                href={item.path}
              >
                {item.buttonText}
              </Link>
            </li>
          );
      })}
    </ul>
  );
};

export default Navigation;
