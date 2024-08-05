import CircleIcon from '@/static/icons/circle-icon';
import CheckCircleIcon from '@/static/icons/check-circle-icon';
import { Step } from '@/app/(after-login)/(top)/createQuestion/_components/progress/types';

const bulletVariants = {
  color: {
    incomplete: 'text-text-003',
    reached: 'text-brand-blue-heavy',
    complete: 'text-brand-blue-heavy',
  },
  iconSize: {
    incomplete: 'h-2 w-2',
    reached: 'h-2 w-2',
    complete: 'h-3 w-3',
  },
  textSize: {
    incomplete: 'text-xs',
    reached: 'text-xs',
    complete: 'text-sm',
  },
};

type BulletProps = {
  stepText: string;
  completed?: boolean;
  current?: boolean;
};

const ProgressBullet = ({
  stepText,
  completed = false,
  current = false,
}: BulletProps) => {
  const status = completed ? 'complete' : current ? 'reached' : 'incomplete';

  return (
    <div
      className={
        bulletVariants.color[status] + ' flex flex-col items-center gap-2'
      }
    >
      {current}
      {completed ? (
        <CheckCircleIcon className={bulletVariants.iconSize[status]} />
      ) : (
        <CircleIcon className={bulletVariants.iconSize[status]} />
      )}
      <p className={bulletVariants.textSize[status]}>{stepText}</p>
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
    <div className="flex h-fit flex-row items-center gap-3">
      {ProgressTexts.map((text, idx) =>
        idx + 1 <= currentStep ? (
          idx + 1 === currentStep ? (
            <ProgressBullet key={idx} stepText={text} current />
          ) : (
            <ProgressBullet key={idx} stepText={text} completed />
          )
        ) : (
          <ProgressBullet key={idx} stepText={text} />
        ),
      )}
    </div>
  );
};

export default ProgressBar;
