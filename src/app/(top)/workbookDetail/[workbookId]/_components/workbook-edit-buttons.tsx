'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const WorkbookEditButtons = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-row gap-4">
      <button>문제집 편집</button>
      <Link href={`${pathname}/intercepted/removeWorkbook`}>문제집 삭제</Link>
      <button>문제집 공유</button>
    </div>
  );
};

export default WorkbookEditButtons;
