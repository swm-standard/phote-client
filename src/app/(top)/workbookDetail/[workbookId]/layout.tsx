import React, { ReactNode } from 'react';

const Layout = ({
  children,
  dialog,
}: {
  children: ReactNode;
  dialog: ReactNode;
}) => {
  return (
    <div>
      {children}
      {dialog}
    </div>
  );
};

export default Layout;
