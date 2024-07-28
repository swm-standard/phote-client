import React from 'react';

const AppContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto h-dvh max-w-[600px] bg-app-bg">{children}</div>
  );
};

export default AppContainer;
