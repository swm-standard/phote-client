'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import WorkbookIcon from '@/static/icons/workbook-icon';

interface NavigationItem {
  path: string;
  buttonText: string;
}

const navigationList: NavigationItem[] = [
  {
    path: '/workbook',
    buttonText: '문제집',
  },
  {
    path: '/question',
    buttonText: '문제',
  },
  {
    path: '/share',
    buttonText: '공유',
  },
  {
    path: '/my',
    buttonText: '마이페이지',
  },
];

const Navigation = () => {
  const path = usePathname();

  return (
    <ul className="flex flex-row justify-between w-full bg-white ">
      <li className="px-9 py-3 gap-1 flex flex-col justify-center items-center">
        <WorkbookIcon className="fill-text-001 w-6 h-6" />
        <p className="text-text-001 text-xs">문제집</p>
      </li>
      <li className="px-9 py-3 gap-1 flex flex-col justify-center items-center">
        <WorkbookIcon className="fill-text-001 w-6 h-6" />
        <p className="text-text-001 text-xs">문제집</p>
      </li>
      <li className="px-9 py-3 gap-1 flex flex-col justify-center items-center">
        <WorkbookIcon className="fill-text-001 w-6 h-6" />
        <p className="text-text-001 text-xs">문제집</p>
      </li>
      <li className="px-9 py-3 gap-1 flex flex-col justify-center items-center">
        <WorkbookIcon className="fill-text-001 w-6 h-6" />
        <p className="text-text-001 text-xs">문제집</p>
      </li>
      {/*{navigationList.map((item, idx) => {*/}
      {/*  const isSelected = path === item.path;*/}

      {/*  if (isSelected)*/}
      {/*    return (*/}
      {/*      <li key={idx} className="text-green-500">*/}
      {/*        {item.buttonText}*/}
      {/*      </li>*/}
      {/*    );*/}
      {/*  else*/}
      {/*    return (*/}
      {/*      <li key={idx}>*/}
      {/*        <Link key={idx} href={item.path}>*/}
      {/*          {item.buttonText}*/}
      {/*        </Link>*/}
      {/*      </li>*/}
      {/*    );*/}
      {/*})}*/}
    </ul>
  );
};

export default Navigation;
