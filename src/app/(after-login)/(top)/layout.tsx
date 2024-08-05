import React, { ReactNode } from 'react';
import Container from '@/components/container';
import Header from './_components/header';

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
