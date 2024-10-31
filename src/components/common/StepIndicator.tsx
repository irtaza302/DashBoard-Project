interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  titles: string[];
  onStepClick: (step: number) => void;
  canNavigate: (targetStep: number) => Promise<boolean>;
}

export const StepIndicator = ({ 
  currentStep, 
  totalSteps, 
  titles, 
  onStepClick,
  canNavigate 
}: StepIndicatorProps) => {
  const handleStepClick = async (step: number) => {
    if (await canNavigate(step)) {
      onStepClick(step);
    }
  };

  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-center space-x-4">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="flex items-center">
            <button
              onClick={() => handleStepClick(index)}
              disabled={index === currentStep}
              className={`flex items-center justify-center w-8 h-8 rounded-full border-2 
                transition-all duration-200
                ${index <= currentStep 
                  ? 'border-indigo-600 bg-indigo-600 text-white' 
                  : 'border-gray-300 text-gray-500 hover:border-indigo-400 hover:bg-indigo-50'
                }
                ${index === currentStep ? 'cursor-default' : 'cursor-pointer'}
                disabled:opacity-100
              `}
              aria-label={`Go to step ${index + 1}`}
            >
              {index + 1}
            </button>
            {index < totalSteps - 1 && (
              <div
                className={`w-20 h-1 mx-2 transition-colors duration-200 ${
                  index < currentStep ? 'bg-indigo-600' : 'bg-gray-300'
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="text-center mt-2">
        <p className="text-sm font-medium text-gray-900">{titles[currentStep]}</p>
      </div>
    </div>
  );
}; 