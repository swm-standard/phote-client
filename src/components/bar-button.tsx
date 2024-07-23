import React from 'react';
import Link from 'next/link';

import WorkbookIcon from '@/static/icons/workbook-icon';

// type PropIcon<T> = {
//   Icon: React.ComponentType<T>;
//   iconProps: T;
// };

const BarButton = ({
  // propIcon,
  text,
  href,
}: {
  // propIcon: PropIcon<T>;
  text: string;
  href: string;
}) => {
  // const { Icon, iconProps } = propIcon;

  return (
    <Link href={href}>
      <button className="bg-brand-blue-heavy w-full flex py-3 justify-center items-center gap-2 rounded-full">
        <WorkbookIcon className="w-5 h-5 fill-white" />
        {/*<Icon {...iconProps} />*/}
        <p className="font-semibold text-sm text-white ">{text}</p>
      </button>
    </Link>
  );
};

export default BarButton;
