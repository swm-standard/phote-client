'use client';

import React from 'react';
import {usePathname} from 'next/navigation';
import SquareButton from "@/components/square-button";

const WorkbookEditButtons = () => {
    const pathname = usePathname();

    return (
        <div className="flex flex-row gap-3">
            <SquareButton variant='light' buttonText='문제집 편집'/>
            <SquareButton variant='dark' buttonText='문제집 공유'/>
        </div>
    );
};

export default WorkbookEditButtons;
