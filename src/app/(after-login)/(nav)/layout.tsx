'use client';

import Container from '@/components/container';
import Navigation from './_components/navigation';

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
