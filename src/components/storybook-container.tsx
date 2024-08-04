import React from 'react';
import Container from '@/components/container';
import RQProvider from '@/components/r-q-provider';

const StorybookContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <RQProvider>
      <Container className="relative flex h-[932px] w-[430px] flex-col bg-app-bg">
        {children}
      </Container>
    </RQProvider>
  );
};

export default StorybookContainer;
