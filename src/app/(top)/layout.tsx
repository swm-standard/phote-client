import React, { ReactNode } from 'react';
import Header from '@/app/(top)/_components/header';
import Container from '@/components/container';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Container className="w-full h-full flex flex-col">
      <Header />
      <section className="flex-grow">{children}</section>
    </Container>
  );
};

export default Layout;
