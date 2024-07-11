'use client';

import Navigation from '@/app/main/navigation';

const Layout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="w-[430px] h-[932px] bg-white relative border-2 border-black">
      {children}
      <Navigation />
    </div>
  );
};

export default Layout;
