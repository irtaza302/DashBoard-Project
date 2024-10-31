import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ProfileFormData } from '../../schemas/profile.schema';
import { PROFILE_STEPS, STEP_ORDER } from '../../constants/profile-steps.constants';
import { StepIndicator } from '../common/StepIndicator';
import { FormInput } from '../common/FormInput';

interface ProfileFormProps {
  form: UseFormReturn<ProfileFormData>;
  onSubmit: (data: ProfileFormData) => Promise<void>;
  isLoading: boolean;
  onClose: () => void;
  isEditing: boolean;
}

export const ProfileForm = ({ form, onSubmit, isLoading, onClose, isEditing }: ProfileFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const { register, handleSubmit, formState: { errors } } = form;

  const renderStep = () => {
    switch (STEP_ORDER[currentStep]) {
      case 'PERSONAL_INFO':
        return (
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Name" name="name" register={register} error={errors.name} />
            <FormInput label="Email" name="email" type="email" register={register} error={errors.email} />
            <FormInput label="Contact" name="contact" register={register} error={errors.contact} />
            <FormInput label="Address" name="address" register={register} error={errors.address} />
          </div>
        );
      case 'EDUCATION':
        return (
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Degree"
              name="education.degree"
              register={register}
              error={errors.education?.degree}
            />
            <FormInput
              label="Completion Year"
              name="education.completionYear"
              type="number"
              register={register}
              error={errors.education?.completionYear}
            />
          </div>
        );
      // Add remaining steps...
      default:
        return null;
    }
  };

  const isLastStep = currentStep === STEP_ORDER.length - 1;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StepIndicator
        currentStep={currentStep}
        totalSteps={STEP_ORDER.length}
        titles={STEP_ORDER.map(step => PROFILE_STEPS[step].title)}
      />
      
      <div className="px-6 py-4">
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {PROFILE_STEPS[STEP_ORDER[currentStep]].title}
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              {PROFILE_STEPS[STEP_ORDER[currentStep]].description}
            </p>
            {renderStep()}
          </div>
        </div>
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t flex justify-between">
        <button
          type="button"
          onClick={() => currentStep > 0 && setCurrentStep(prev => prev - 1)}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          disabled={currentStep === 0}
        >
          Previous
        </button>
        <div className="space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type={isLastStep ? 'submit' : 'button'}
            onClick={() => !isLastStep && setCurrentStep(prev => prev + 1)}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : isLastStep ? (isEditing ? 'Update' : 'Save') : 'Next'}
          </button>
        </div>
      </div>
    </form>
  );
}; 