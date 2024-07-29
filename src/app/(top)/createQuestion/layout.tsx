import React from 'react';

const Layout = ({
  children,
  dialog,
}: {
  children: React.ReactNode;
  dialog: React.ReactNode;
}) => {
  return (
    <>
      {children}
      {dialog}
    </>
  );
};

export default Layout;
