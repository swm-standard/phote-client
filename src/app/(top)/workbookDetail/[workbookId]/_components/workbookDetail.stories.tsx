import type {Meta, StoryObj} from '@storybook/react';
import {http, HttpResponse} from 'msw';
import {BASE_URL} from '@/app/_lib/constants';
import {Dummy_Questions, Dummy_Workbook} from '@/app/_lib/dummy';
import Container from '@/components/container';

import Page from '../page';
import Header from "@/app/(top)/_components/header";

const meta = {
    title: 'WorkbookDetail',
    component: Page,
    decorators: [
        (Story) => (
            <Container className="w-[430px] h-[932px] bg-app-bg relative flex flex-col">
                <Header/>
                <Story/>
            </Container>
        ),
    ],
    parameters: {
        layout: 'centered',
        nextjs: {
            appDirectory: true,
            navigation: {
                segments: ['workbookDetail', ['workbookId', '1']],
            },
        },
    },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FullQuestions: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get(`${BASE_URL}/workbook/1`, () => {
                    return HttpResponse.json(Dummy_Workbook);
                }),
                http.get(`${BASE_URL}/workbook/questions/1`, () => {
                    return HttpResponse.json(Dummy_Questions);
                }),
            ],
        },
    },
};

export const SomeQuestions: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get(`${BASE_URL}/workbook/1`, () => {
                    return HttpResponse.json(Dummy_Workbook);
                }),
                http.get(`${BASE_URL}/workbook/questions/1`, () => {
                    return HttpResponse.json(Dummy_Questions.slice(1, 5));
                }),
            ],
        },
    },
};

export const NoQuestions: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get(`${BASE_URL}/workbook/1`, () => {
                    return HttpResponse.json(Dummy_Workbook);
                }),
                http.get(`${BASE_URL}/workbook/questions/1`, () => {
                    return HttpResponse.json([]);
                }),
            ],
        },
    },
};