'use client';

import React from 'react';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import WorkbookIcon from '@/static/icons/workbook-icon';
import QuestionIcon from '@/static/icons/question-icon';
import ProfileIcon from '@/static/icons/profile-icon';

interface NavigationItem {
  path: string;
  buttonText: string;
  icon: React.ComponentType<{ className: string }>;
}

const navigationList: NavigationItem[] = [
  {
    path: 'workbook',
    buttonText: '문제집',
    icon: WorkbookIcon,
  },
  {
    path: 'question',
    buttonText: '문제',
    icon: QuestionIcon,
  },
  // {
  //   path: 'share',
  //   buttonText: '공유',
  //   icon: ShareIcon,
  // },
  {
    path: 'my',
    buttonText: '마이페이지',
    icon: ProfileIcon,
  },
];

const Navigation = () => {
  const segment = useSelectedLayoutSegment();

  return (
    <ul className="flex w-full flex-row items-center justify-around bg-white pb-2 pt-3">
      {navigationList.map((item, idx) =>
        segment === item.path ? (
          <li
            key={idx}
            className="flex flex-1 flex-col items-center justify-center gap-1"
          >
            <item.icon className="h-6 w-6" />
            <p className="text-xs">{item.buttonText}</p>
          </li>
        ) : (
          <Link className="flex-1" href={item.path} key={idx}>
            <li className="flex flex-col items-center justify-center gap-1 text-text-003">
              <item.icon className="h-6 w-6" />
              <p className="text-xs">{item.buttonText}</p>
            </li>
          </Link>
        ),
      )}
    </ul>
  );
};

export default Navigation;
