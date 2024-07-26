import React from 'react';

const AppContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto max-w-[600px] h-full bg-app-bg">{children}</div>
  );
};

export default AppContainer;
