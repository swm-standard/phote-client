import React from 'react';
import BannerIcon from '@/static/icons/banner-icon';

const Banner = () => {
  return (
    <div className="mt-4 bg-banner-bg w-full px-6 py-6 rounded-[20px] flex justify-between items-center">
      <div className="flex flex-col gap-2.5">
        <p className="font-semibold text-lg text-text-001">
          함께 포테를 만들어나가요!
        </p>
        <button className="bg-white text-text-001 text-sm px-2 py-1 rounded-lg w-fit font-semibold">
          건의하기
        </button>
      </div>
      <BannerIcon />
    </div>
  );
};

export default Banner;
