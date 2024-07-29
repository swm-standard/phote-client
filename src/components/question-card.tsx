import React, {useEffect, useState} from 'react';
import {Question, Status} from '@/app/_lib/types';
import {DragControls, Reorder, useDragControls} from 'framer-motion';
import {BASE_URL} from '@/app/_lib/constants';
import {useParams} from 'next/navigation';
import {useDebounce} from 'use-debounce';
import AngleRightIcon from "@/static/icons/angle-right-icon";
import TwoBarIcon from "@/static/icons/two-bar-icon";
import AngleDownIcon from "@/static/icons/angle-down-icon";
import InfoIcon from "@/static/icons/info-icon";
import Image from "next/image";
import dummy from '@/static/images/dummy-image-square.jpg'
import NumberCircle from "@/components/number-circle";

const ReorderWrapper = ({
                            question,
                            questionNumber,
                        }: {
    question: Question;
    questionNumber: number;
}) => {
    const controls = useDragControls();

    return (
        <Reorder.Item value={question} dragListener={false} dragControls={controls}>
            <QuestionCard
                question={question}
                questionNumber={questionNumber}
                controls={controls}
                allowSwap
            />
        </Reorder.Item>
    );
};

const QuestionCard = ({
                          question,
                          questionNumber,
                          allowSwap = false,
                          controls,
                      }: {
    question: Question;
    questionNumber: number;
    allowSwap?: boolean;
    controls?: DragControls;
}) => {
    const [isExpanded, setExpanded] = useState<boolean>(false);
    const category = question.category === 'ESSAY' ? "단답형" : "객관식"

    const handleExpandToggleClick: React.MouseEventHandler<
        HTMLButtonElement
    > = (e) => {
        setExpanded((prev) => !prev);
    };

    const handleDragPointerDown: React.PointerEventHandler<HTMLButtonElement> = (
        e,
    ) => {
        controls?.start(e)
    };

    const handleClickBlock: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation()
    }

    return (
        <button type='button' className='w-full' onClick={handleExpandToggleClick}>
            <div
                className="border-b-[1px] border-brand-gray-heavy">
                <div
                    className={`flex w-full justify-between bg-white gap-2 items-center p-4 ${isExpanded && "pb-0"}`}>
                    <div>
                        {isExpanded ? <AngleDownIcon className='w-4 h-4 text-text-001'/> :
                            <AngleRightIcon className='w-4 h-4 text-text-001'/>
                        }
                    </div>
                    <div className='flex-grow'>
                        <div className='text-xs font-bold flex gap-1'>
                            <span className='text-text-004'>{category}</span>
                            {question.tags.map((tag, idx) => (
                                <span key={idx} className='text-brand-blue-heavy'>{`#${tag}`}</span>
                            ))}
                        </div>
                        {
                            isExpanded ? (<p className='text-left font-normal text-base text-text-001'>
                                    <span className='font-bold'>{`Q${questionNumber} `}</span>
                                </p>
                            ) : (<p className={`text-left font-normal text-base line-clamp-1 text-text-001`}>
                                <span className='font-bold'>{`Q${questionNumber} `}</span>
                                {question.statement}
                            </p>)
                        }
                    </div>
                    {(allowSwap && !isExpanded) &&
                        <button onClick={handleClickBlock}
                                onPointerDown={handleDragPointerDown}><TwoBarIcon
                            className='w-4 h-4 text-text-003'/>
                        </button>}
                    {isExpanded && <button onClick={handleClickBlock}
                                           onPointerDown={handleDragPointerDown}><InfoIcon
                        className='w-4 h-4 text-text-003'/>
                    </button>}
                </div>
                {
                    isExpanded &&
                    <div className='flex flex-col gap-4 py-4 px-10'>
                        <div className='flex flex-col'>
                            <span className='text-text-001 text-sm font-bold text-left'>[ 문제 설명 ]</span>
                            <p className='text-left font-normal text-base text-text-001'>{question.statement}</p>
                        </div>
                        <Image src={dummy} alt='test'/>
                        <div className='flex flex-col gap-1'>
                            <span className='text-text-001 text-sm font-bold text-left'>[ 선택지 ]</span>
                            <ul className='flex flex-col gap-1'>
                                {
                                    question.options.map((option, idx) => <li key={idx}
                                                                              className='text-left flex items-center gap-2'>
                                        <NumberCircle
                                            number={idx + 1}/>{option.value}</li>)
                                }
                            </ul>
                        </div>
                    </div>
                }
            </div>
        </button>
    );
};

const QuestionCards = ({
                           questions,
                           allowSwap = false,
                       }: {
    questions: Question[];
    allowSwap?: boolean;
}) => {
    const [status, setStatus] = useState<Status>('loading');
    const [countApiCalls, setCountApiCalls] = useState<number>(0);
    const params = useParams<{ workbookId: string }>();
    const [debouncedQuestions] = useDebounce(questions, 2000);

    const updateQuestionSequence = async () => {
        if (!allowSwap) return;
        if (countApiCalls === 0) {
            setCountApiCalls((prev) => prev + 1);
            return;
        }

        const requestData = questions.map((ques, idx) => {
            return {id: ques.id, sequence: idx + 1};
        });

        try {
            const response = await fetch(
                `${BASE_URL}/workbook/question-sequence/${params.workbookId}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestData),
                },
            );

            const data = await response.json();
            setStatus('success');
        } catch (err) {
            setStatus('error');
        } finally {
            setCountApiCalls((prev) => prev + 1);
        }
    };

    useEffect(() => {
        (async () => {
            await updateQuestionSequence();
        })();
    }, [debouncedQuestions]);

    return (
        <div className="flex flex-col">
            {questions.map((ques, idx) => {
                if (allowSwap)
                    return (
                        <ReorderWrapper
                            key={ques.id}
                            question={ques}
                            questionNumber={idx + 1}
                        />
                    );
                else
                    return (
                        <QuestionCard
                            key={ques.id}
                            question={ques}
                            questionNumber={idx + 1}
                        />
                    );
            })}
        </div>
    );
};

export default QuestionCards;
