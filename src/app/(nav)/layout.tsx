'use client';

import Navigation from '@/app/(nav)/_components/navigation';
import Container from '@/components/container';

const Layout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Container className="relative flex flex-col">
      {children}
      <Navigation />
    </Container>
  );
};

export default Layout;
