import React, { ReactNode } from 'react';
import Container from '@/components/container';
import Header from './header';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Container className="flex flex-col overflow-scroll">
      <section>
        <Header />
      </section>
      <section className="flex-grow">{children}</section>
    </Container>
  );
};

export default Layout;
