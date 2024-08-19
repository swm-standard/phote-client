import React from 'react';

const AppContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto box-content h-dvh max-w-[430px] border-x-[1px] border-[#efefef] bg-app-bg">
      {children}
    </div>
  );
};

export default AppContainer;
