import React from 'react';
import Link from 'next/link';

const BarButton = ({
  Icon,
  text,
  href,
}: {
  Icon: React.ComponentType<{ className: string }>;
  text: string;
  href: string;
}) => {
  // const { Icon, iconProps } = propIcon;

  return (
    <Link href={href}>
      <button className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-blue-heavy py-3">
        <Icon className="h-5 w-5 fill-white" />
        <p className="text-sm font-semibold text-white">{text}</p>
      </button>
    </Link>
  );
};

export default BarButton;
