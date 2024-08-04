export type Step = 1 | 2 | 3;

export type StepProps = {
  currentStep: Step;
  setToNextStep: () => void;
  setToPrevStep: () => void;
};
