import React, { ReactNode } from 'react';
import Header from '@/app/(top)/_components/header';
import Container from '@/components/container';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Container className="flex flex-col">
      <section>
        <Header />
      </section>
      <section className="flex-grow">{children}</section>
    </Container>
  );
};

export default Layout;
