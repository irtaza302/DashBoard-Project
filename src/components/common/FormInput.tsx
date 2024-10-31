import { FieldError, UseFormRegister } from 'react-hook-form';
import { ProfileFormData } from '../../schemas/profile.schema';

interface FormInputProps {
  label: string;
  name: keyof ProfileFormData | `education.${string}`;
  type?: string;
  register: UseFormRegister<ProfileFormData>;
  error?: FieldError;
  placeholder?: string;
}

export const FormInput = ({
  label,
  name,
  type = 'text',
  register,
  error,
  placeholder
}: FormInputProps) => {
  return (
    <div className="w-full">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          {...register(name as any)}
          className={`
            block w-full px-3 py-2 rounded-lg border
            ${error ? 'border-red-300' : 'border-gray-300'}
            focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500
            transition-colors duration-200
            placeholder:text-gray-400 text-gray-900 text-sm
          `}
          placeholder={placeholder}
        />
        {error && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error.message}</p>
      )}
    </div>
  );
}; 