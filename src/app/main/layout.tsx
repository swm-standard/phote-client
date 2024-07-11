'use client';

import Navigation from '@/app/main/navigation';

const Layout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="w-full h-full relative bg-cyan-500">
      {children}
      <Navigation />
    </div>
  );
};

export default Layout;
