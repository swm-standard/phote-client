import React, { ReactNode } from 'react';

const Layout = ({
  children,
  drawer,
}: {
  children: ReactNode;
  drawer: ReactNode;
}) => {
  return (
    <div>
      {children}
      {drawer}
    </div>
  );
};

export default Layout;
