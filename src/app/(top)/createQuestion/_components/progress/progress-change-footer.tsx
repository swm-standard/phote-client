import React from 'react';
import {Step} from '@/app/(top)/createQuestion/_components/progress/types';

const ButtonText = {
    1: {
        left: '직접 입력하기',
        right: '사진 변환하기',
    },
    2: {
        left: '사진 다시찍기',
        right: '다음으로',
    },
    3: {
        left: '이전으로',
        right: '문제 생성',
    },
};

const ProgressChangeFooter = ({
                                  handleLeftButtonClick,
                                  handleRightButtonClick,
                                  currentStep,
                              }: {
    handleLeftButtonClick: () => void;
    handleRightButtonClick: () => void;
    currentStep: Step;
}) => {
    return (
        <div className="w-full">
            <button onClick={handleLeftButtonClick}>
                {ButtonText[currentStep].left}
            </button>
            <button onClick={handleRightButtonClick}>
                {ButtonText[currentStep].right}
            </button>
        </div>
    );
};

export default ProgressChangeFooter;
