import React from 'react';
import HourglassIcon from '@/static/icons/hourglass-icon';

const Loading = () => {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-dvh w-dvw items-center justify-center bg-slate-100 bg-opacity-55">
      <HourglassIcon className="h-6 w-6 animate-spin" />
    </div>
  );
};

export default Loading;
