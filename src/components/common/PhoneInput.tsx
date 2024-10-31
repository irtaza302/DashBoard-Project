import { Controller } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { ProfileFormData } from '../../schemas/profile.schema';
import type { Control } from 'react-hook-form';

interface PhoneInputFieldProps {
  control: Control<ProfileFormData>;
  error?: string;
}

export const PhoneInputField = ({ control, error }: PhoneInputFieldProps) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Contact Number
      </label>
      <Controller
        name="contact"
        control={control}
        render={({ field: { onChange, value } }) => (
          <PhoneInput
            country={'us'}
            value={value || ''}
            onChange={(phone) => onChange(phone)}
            inputClass={`
              !w-full !h-10 !pl-12 !pr-3 !py-2 !rounded-lg !border
              ${error ? '!border-red-300' : '!border-gray-300'}
              !focus:outline-none !focus:ring-2 !focus:ring-indigo-500/20 !focus:border-indigo-500
              !transition-colors !duration-200
              !text-gray-900 !text-sm
            `}
            containerClass="!w-full"
            buttonClass={`
              !border-0 !bg-transparent
              ${error ? '!border-red-300' : '!border-gray-300'}
            `}
            searchClass="!text-sm"
            dropdownClass="!text-sm"
            enableSearch
            disableSearchIcon
            countryCodeEditable={false}
            preferredCountries={['us', 'gb', 'ca', 'au', 'pk', 'in']}
          />
        )}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}; 