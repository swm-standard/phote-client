'use client';

import {useEffect, useState} from 'react';
import {Status, Workbook} from '@/app/_lib/types';
import {useParams, usePathname} from 'next/navigation';
import {BASE_URL} from '@/app/_lib/constants';
import WorkbookCard from "@/components/workbook-card";
import WorkbookEditButtons from "@/app/(top)/workbookDetail/[workbookId]/_components/workbook-edit-buttons";

const WorkbookInformation = () => {
    const [workbook, setWorkbook] = useState<Workbook | null>(null);
    const [status, setStatus] = useState<Status>('loading');

    const params = useParams<{ workbookId: string }>();
    const pathname = usePathname();

    useEffect(() => {
        fetch(`${BASE_URL}/workbook/${params.workbookId}`)
            .then((res) => res.json())
            .then((res) => {
                setWorkbook(res);
                setStatus('success');
            })
            .catch((err) => {
                setStatus('error');
            });
    }, []);

    if (status === 'loading') return <div>loading..</div>;
    else if (!workbook) return <div>workbook-information load fail</div>;
    else
        return (
            <div className='py-6 px-10 flex flex-col gap-4'>
                <WorkbookCard workbook={workbook}/>
                <WorkbookEditButtons/>
            </div>
        );
};

export default WorkbookInformation;
