import { useState, useEffect } from 'react';
import { UseFormReturn} from 'react-hook-form';
import { ProfileFormData } from '../../schemas/profile.schema';
import { PROFILE_STEPS, STEP_ORDER } from '../../constants/profile-steps.constants';
import { StepIndicator } from '../common/StepIndicator';
import { FormInput } from '../common/FormInput';
import { PhoneInputField } from '../common/PhoneInput';
import { FORM_INPUTS } from '../../constants/form-inputs.constants';
import { FORM_CONSTANTS } from '../../constants/form.constants';
import { VALIDATION_FIELDS } from '../../constants/form-validation.constants';

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
    const currentStepKey = STEP_ORDER[step];
    const fieldsToValidate = VALIDATION_FIELDS[currentStepKey];
    return await trigger(fieldsToValidate);
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

  const handleStepClick = async (step: number) => {
    const canNavigate = await canNavigateToStep(step);
    if (canNavigate) {
      // Save current step data
      const currentData = form.getValues();
      setCurrentStep(step);
      // Restore form data after step change
      form.reset(currentData, { keepDefaultValues: true });
    }
  };

  const renderStep = () => {
    const { LABELS, PLACEHOLDERS } = FORM_INPUTS;
    
    switch (STEP_ORDER[currentStep]) {
      case 'PERSONAL_INFO':
        return (
          <div className={FORM_CONSTANTS.LAYOUT.GRID}>
            <FormInput 
              label={LABELS.PERSONAL_INFO.NAME} 
              name="name" 
              type="TEXT"
              register={register} 
              error={errors.name} 
            />
            <FormInput 
              label={LABELS.PERSONAL_INFO.EMAIL} 
              name="email" 
              type="EMAIL"
              register={register} 
              error={errors.email}
              placeholder={PLACEHOLDERS.EMAIL}
            />
            <PhoneInputField 
              control={control} 
              error={errors.contact?.message}
            />
            <FormInput 
              label={LABELS.PERSONAL_INFO.ADDRESS} 
              name="address" 
              type="TEXT"
              register={register} 
              error={errors.address} 
            />
          </div>
        );
      case 'EDUCATION':
        return (
          <div className={FORM_CONSTANTS.LAYOUT.GRID}>
            <FormInput
              label={LABELS.EDUCATION.DEGREE}
              name="education.degree"
              type="TEXT"
              register={register}
              error={errors.education?.degree}
            />
            <FormInput
              label={LABELS.EDUCATION.COMPLETION_YEAR}
              name="education.completionYear"
              type="NUMBER"
              register={register}
              error={errors.education?.completionYear}
            />
          </div>
        );
      case 'ADDITIONAL_INFO':
        return (
          <div className={FORM_CONSTANTS.LAYOUT.GRID}>
            <FormInput
              label={LABELS.ADDITIONAL_INFO.STUDENT_CARD}
              name="studentCard"
              type="TEXT"
              register={register}
              error={errors.studentCard}
            />
            <FormInput
              label={LABELS.ADDITIONAL_INFO.EXPIRY_DATE}
              name="expiryDate"
              type="DATE"
              register={register}
              error={errors.expiryDate}
            />
          </div>
        );
      case 'PROFESSIONAL_LINKS':
        return (
          <div className={FORM_CONSTANTS.LAYOUT.GRID}>
            <FormInput
              label={LABELS.PROFESSIONAL_LINKS.PORTFOLIO}
              name="portfolio"
              type="URL"
              register={register}
              error={errors.portfolio}
              placeholder={PLACEHOLDERS.PORTFOLIO}
            />
            <FormInput
              label={LABELS.PROFESSIONAL_LINKS.GITHUB}
              name="githubLink"
              type="URL"
              register={register}
              error={errors.githubLink}
              placeholder={PLACEHOLDERS.GITHUB}
            />
          </div>
        );
      default:
        return null;
    }
  };

  const isLastStep = currentStep === STEP_ORDER.length - 1;

  const handleNext = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid && currentStep < STEP_ORDER.length - 1) {
      const currentData = form.getValues();
      setCurrentStep(prev => prev + 1);
      form.reset(currentData, { keepDefaultValues: true });
    }
  };

  const onFormSubmit = handleSubmit(async (data) => {
    const isValid = await validateStep(currentStep);
    if (isValid && isLastStep) {
      try {
        const formattedData = {
          ...data,
          education: {
            ...data.education,
            completionYear: Number(data.education.completionYear)
          },
          expiryDate: data.expiryDate,
          portfolio: data.portfolio || '',
          githubLink: data.githubLink || ''
        };
        await onSubmit(formattedData);
      } catch (error) {
        console.error('Form submission error:', error);
      }
    } else {
      handleNext();
    }
  });

  useEffect(() => {
    return () => {
      form.reset();
    };
  }, [form]);

  return (
    <form onSubmit={onFormSubmit} className="space-y-6">
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
            type="button"
            onClick={isLastStep ? onFormSubmit : handleNext}
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