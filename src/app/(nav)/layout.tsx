'use client';

import Navigation from '@/app/(nav)/_components/navigation';

const Layout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="mx-auto max-w-[600px] h-[100vh] relative ">
      {children}
      <Navigation />
    </div>
  );
};

export default Layout;
