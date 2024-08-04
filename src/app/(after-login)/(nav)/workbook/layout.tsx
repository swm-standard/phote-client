import React, { ReactNode } from 'react';

const Layout = ({
  children,
  drawer,
}: {
  children: ReactNode;
  drawer: ReactNode;
}) => {
  return (
    <>
      {children}
      {drawer}
    </>
  );
};

export default Layout;
