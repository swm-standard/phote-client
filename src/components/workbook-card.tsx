import {Workbook} from '@/app/_lib/types';
import {Separator} from '@/components/ui/separator';
import TrashCanIcon from "@/static/icons/trash-can-icon";
import React from "react";

const WorkbookCard = ({workbook}: { workbook: Workbook }) => {
    const {id, emoji, title, description, quantity, modifiedAt} = {
        ...workbook,
    };

    const formatDate = (d: Date) => {
        const date = new Date(d);
        const year = date.getFullYear().toString().slice(-2); // 연도의 마지막 두 자리
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월을 2자리로 패딩
        const day = date.getDate().toString().padStart(2, '0'); // 일을 2자리로 패딩
        return `${year}.${month}.${day}`;
    };

    const dateString = formatDate(modifiedAt);

    return (
        <div
            className="flex h-full w-full flex-col rounded-2xl border-[1px] border-[#ecflfa] bg-white p-3"
            style={{boxShadow: '0px 11px 15px 0px #0000000A'}}
        >
            <div className="flex flex-grow flex-col gap-2">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#fafafa]">
                    <span className="text-2xl">{emoji}</span>
                </div>
                <p className="text-xl font-semibold text-text-001">
                    {title}
                </p>
                <p className="text-xs font-normal text-text-003">
                    {description}
                </p>
            </div>
            <Separator className="my-3"/>
            <div className='flex justify-between items-center'>
                <div className="flex flex-row gap-2">
                    <PropertyChunk label="문제수" value={quantity}/>
                    <Separator className="" orientation="vertical"/>
                    <PropertyChunk label="수정일" value={dateString}/>
                </div>
                {/*<Link href={`${pathname}/intercepted/removeWorkbook`}>문제집 삭제</Link>*/}
                <button>
                    <TrashCanIcon className='w-5 h-5 text-text-002'/>
                </button>
            </div>
        </div>
    );
};

const PropertyChunk = ({
                           label,
                           value,
                       }: {
    label: string;
    value: string | number;
}) => {
    return (
        <div>
            <p className="text-center text-[0.625rem] font-normal text-[#9b9b9b]">
                {label}
            </p>
            <p className="text-center text-xs font-medium text-[#65656e]">{value}</p>
        </div>
    );
};

export default WorkbookCard;