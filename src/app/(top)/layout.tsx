import React, { ReactNode } from 'react';
import Header from '@/app/(top)/_components/header';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full h-full flex flex-col">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
