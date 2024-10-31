import { useState } from 'react';
import { UseFormReturn, Path } from 'react-hook-form';
import { ProfileFormData } from '../../schemas/profile.schema';
import { PROFILE_STEPS, STEP_ORDER } from '../../constants/profile-steps.constants';
import { StepIndicator } from '../common/StepIndicator';
import { FormInput } from '../common/FormInput';
import { PhoneInputField } from '../common/PhoneInput';

interface ProfileFormProps {
  form: UseFormReturn<ProfileFormData>;
  onSubmit: (data: ProfileFormData) => Promise<void>;
  isLoading: boolean;
  onClose: () => void;
  isEditing: boolean;
}

export const ProfileForm = ({ form, onSubmit, isLoading, onClose, isEditing }: ProfileFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const { register, handleSubmit, formState: { errors }, trigger, control } = form;

  const validateStep = async (step: number) => {
    const fieldsToValidate = STEP_ORDER[step] === 'PERSONAL_INFO'
      ? ['name', 'email', 'contact', 'address']
      : STEP_ORDER[step] === 'EDUCATION'
      ? ['education.degree', 'education.completionYear']
      : STEP_ORDER[step] === 'ADDITIONAL_INFO'
      ? ['studentCard', 'expiryDate']
      : ['portfolio', 'githubLink'];

    return await trigger(fieldsToValidate as Path<ProfileFormData>[]);
  };

  const canNavigateToStep = async (targetStep: number) => {
    // Can always go back
    if (targetStep < currentStep) return true;
    
    // Validate all steps up to the target
    for (let step = currentStep; step < targetStep; step++) {
      const isValid = await validateStep(step);
      if (!isValid) return false;
    }
    return true;
  };

  const handleStepClick = (step: number) => {
    setCurrentStep(step);
  };

  const renderStep = () => {
    switch (STEP_ORDER[currentStep]) {
      case 'PERSONAL_INFO':
        return (
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Name" name="name" register={register} error={errors.name} />
            <FormInput label="Email" name="email" type="email" register={register} error={errors.email} />
            <PhoneInputField 
              control={control} 
              error={errors.contact?.message}
            />
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
      case 'ADDITIONAL_INFO':
        return (
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Student Card Number"
              name="studentCard"
              register={register}
              error={errors.studentCard}
            />
            <FormInput
              label="Expiry Date"
              name="expiryDate"
              type="date"
              register={register}
              error={errors.expiryDate}
            />
          </div>
        );
      case 'PROFESSIONAL_LINKS':
        return (
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Portfolio URL"
              name="portfolio"
              type="url"
              register={register}
              error={errors.portfolio}
              placeholder="https://your-portfolio.com"
            />
            <FormInput
              label="GitHub Profile"
              name="githubLink"
              type="url"
              register={register}
              error={errors.githubLink}
              placeholder="https://github.com/username"
            />
          </div>
        );
      default:
        return null;
    }
  };

  const isLastStep = currentStep === STEP_ORDER.length - 1;

  const handleNext = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    const fieldsToValidate = STEP_ORDER[currentStep] === 'PERSONAL_INFO' 
      ? ['name', 'email', 'contact', 'address']
      : STEP_ORDER[currentStep] === 'EDUCATION'
      ? ['education.degree', 'education.completionYear']
      : STEP_ORDER[currentStep] === 'ADDITIONAL_INFO'
      ? ['studentCard', 'expiryDate']
      : STEP_ORDER[currentStep] === 'PROFESSIONAL_LINKS'
      ? ['portfolio', 'githubLink']
      : [];

    const isValid = await trigger(fieldsToValidate as Path<ProfileFormData>[]);
    
    if (isValid && !isLastStep) {
      setCurrentStep(prev => prev + 1);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <StepIndicator
        currentStep={currentStep}
        totalSteps={STEP_ORDER.length}
        titles={STEP_ORDER.map(step => PROFILE_STEPS[step].title)}
        onStepClick={handleStepClick}
        canNavigate={canNavigateToStep}
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
            onClick={isLastStep ? undefined : handleNext}
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