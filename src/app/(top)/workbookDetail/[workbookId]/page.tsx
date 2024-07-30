'use client';

import {useParams} from 'next/navigation';
import WorkbookInformation from '@/app/(top)/workbookDetail/[workbookId]/_components/workbook-information';
import WorkbookQuestionArea from '@/app/(top)/workbookDetail/[workbookId]/_components/workbook-question-area';
import Container from "@/components/container";

const Page = () => {
    const params = useParams<{ workbookId: string }>();

    return (
        <Container className='flex flex-col overflow-scroll'>
            <section>
                <WorkbookInformation/>
            </section>
            <section className='flex-grow'>
                <WorkbookQuestionArea/>
            </section>
        </Container>
    );
};

export default Page;
