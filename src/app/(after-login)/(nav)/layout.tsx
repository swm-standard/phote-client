'use client';

import React from 'react';
import Container from '@/components/container';
import Navigation from './navigation';

const Layout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Container className="flex flex-col">
      <section className="flex-grow overflow-scroll">{children}</section>
      <section>
        <Navigation />
      </section>
    </Container>
  );
};

export default Layout;
