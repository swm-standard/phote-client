import { Step } from '@/app/(top)/createQuestion/_components/progress/types';

const ProgressBullet = ({
  stepText,
  completed = false,
}: {
  stepText: string;
  completed?: boolean;
}) => {
  if (completed)
    return (
      <div className="h-[100px] bg-gray-100">
        <div className={`h-0 w-[80px] border-2 border-blue-500`}>
          <div className="relative flex -translate-y-1/2 translate-x-1/2 flex-col items-center">
            <div className={`rounded-full border-8 border-blue-500`} />
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
      <div className="h-[100px] bg-gray-100">
        <div className={`h-0 w-[80px] border-2 border-gray-300`}>
          <div className="relative flex -translate-y-1/2 translate-x-1/2 flex-col items-center">
            <div className={`rounded-full border-8 border-gray-300`} />
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
    <div className="flex h-fit flex-row">
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
