import React from 'react';
import ProgressBar from '@/app/(top)/createQuestion/_components/progress/progress-bar';
import {Step} from '@/app/(top)/createQuestion/_components/progress/types';

type StepText = {
    main: string;
    sub: string;
};

const StepTexts: StepText[] = [
    {
        main: '생성할 문제의 사진을 찍어주세요',
        sub: '이미 사진첩에 존재하는 사진도 추가할 수 있어요',
    },
    {
        main: '올바르게 변환되었는지 확인해주세요',
        sub: '문제가 있는 경우 직접 수정할 수 있어요',
    },
    {
        main: '추가 정보를 입력하고 생성을 완료하세요',
        sub: '태그와 메모는 반드시 기입할 필요 없어요',
    },
];

const Progress = ({currentStep}: { currentStep: Step }) => {
    const {main, sub} = StepTexts[currentStep - 1];
    return (
        <div>
            <h1>Step #{currentStep}</h1>
            <h1>{main}</h1>
            <h2>{sub}</h2>
            <ProgressBar currentStep={currentStep}/>
        </div>
    );
};

export default Progress;
