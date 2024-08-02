'use client';

import Navigation from '@/app/(nav)/_components/navigation';
import Container from '@/components/container';

const Layout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Container className="flex flex-col">
      <section className="flex-grow">{children}</section>
      <section>
        <Navigation />
      </section>
    </Container>
  );
};

export default Layout;
