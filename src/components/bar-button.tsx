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
            <button className="bg-brand-blue-heavy w-full flex py-3 justify-center items-center gap-2 rounded-full">
                <Icon className="w-5 h-5 fill-white"/>
                <p className="font-semibold text-sm text-white ">{text}</p>
            </button>
        </Link>
    );
};

export default BarButton;
