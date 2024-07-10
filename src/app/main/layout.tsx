'use client';

import { main } from '@/app/main/main.css';
import Navigation from '@/app/main/navigation';

const Layout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className={main}>
      {children}
      <Navigation />
    </div>
  );
};

export default Layout;
