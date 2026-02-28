type ProgressProps = {
  currentStep: number;
  labels: string[];
};

export default function Progress({ currentStep, labels }: ProgressProps) {
  const total = labels.length;
  const percentage = (currentStep / total) * 100;

  return (
    <div className="mx-auto w-full max-w-md" aria-label={`Step ${currentStep} of ${total}`}>
      <p className="sr-only">
        Step {currentStep} of {total}: {labels[currentStep - 1]}
      </p>
      <div className="h-[2px] w-full bg-rose-100">
        <div
          className="h-[2px] bg-rose-400 transition-all"
          style={{ width: `${percentage}%` }}
          aria-hidden
        />
      </div>
    </div>
  );
}
