import React from 'react';
import BannerIcon from '@/static/icons/banner-icon';

const Banner = () => {
  return (
    <div className="mt-4 flex w-full items-center justify-between overflow-hidden rounded-[20px] bg-banner-bg px-5 py-3">
      <div className="flex flex-col gap-2.5">
        <p className="text-base font-semibold text-text-001">
          함께 포테를 만들어나가요!
        </p>
        <button className="w-fit rounded-lg bg-white px-2 py-1 text-sm font-semibold text-text-001">
          건의하기
        </button>
      </div>
      <BannerIcon className="w-28" />
    </div>
  );
};

export default Banner;
