import Step from '@/app/(top)/createQuestion/_components/progress/types';
import style from './progress-bar.module.css';

const ProgressBullet = ({
  stepText,
  completed = false,
}: {
  stepText: string;
  completed?: boolean;
}) => {
  if (completed)
    return (
      <div className="bg-gray-100 h-[100px]">
        <div className={`w-[80px] h-0 border-2 border-blue-500`}>
          <div className="translate-x-1/2 -translate-y-1/2 flex flex-col items-center relative">
            <div className={`border-8 border-blue-500 rounded-full`} />
            <div
              className={`absolute translate-y-1/2 text-center text-blue-500`}
            >
              {stepText}
            </div>
          </div>
        </div>
      </div>
    );
  else
    return (
      <div className="bg-gray-100 h-[100px]">
        <div className={`w-[80px] h-0 border-2 border-gray-300`}>
          <div className="translate-x-1/2 -translate-y-1/2 flex flex-col items-center relative">
            <div className={`border-8 border-gray-300 rounded-full`} />
            <div
              className={`absolute translate-y-1/2 text-center text-gray-300`}
            >
              {stepText}
            </div>
          </div>
        </div>
      </div>
    );
};

const ProgressTexts: string[] = [
  '문제 사진 등록',
  '문제 변환 확인',
  '추가 정보 기입',
];

const ProgressBar = ({ currentStep }: { currentStep: Step }) => {
  return (
    <div className="h-fit flex flex-row">
      {ProgressTexts.map((text, idx) =>
        idx + 1 <= currentStep ? (
          <ProgressBullet key={idx} stepText={text} completed />
        ) : (
          <ProgressBullet key={idx} stepText={text} />
        ),
      )}
    </div>
  );
};

export default ProgressBar;
