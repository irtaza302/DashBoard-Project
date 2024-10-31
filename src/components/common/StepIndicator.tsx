interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  titles: string[];
}

export const StepIndicator = ({ currentStep, totalSteps, titles }: StepIndicatorProps) => {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-center space-x-4">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full border-2 
                ${index <= currentStep 
                  ? 'border-indigo-600 bg-indigo-600 text-white' 
                  : 'border-gray-300 text-gray-500'
                }`}
            >
              {index + 1}
            </div>
            {index < totalSteps - 1 && (
              <div
                className={`w-20 h-1 mx-2 ${
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