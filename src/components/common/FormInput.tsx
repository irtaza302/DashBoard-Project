import { UseFormRegister, Path, FieldError } from 'react-hook-form';
import { ProfileFormData } from '../../schemas/profile.schema';
import { FORM_INPUTS, type InputType } from '../../constants/form-inputs.constants';

interface FormInputProps {
  label: string;
  name: Path<ProfileFormData>;
  type?: InputType;
  register: UseFormRegister<ProfileFormData>;
  error?: FieldError;
  placeholder?: string;
  icon?: React.ReactNode;
  className?: string;
}

export const FormInput = ({
  label,
  name,
  type = 'TEXT',
  register,
  error,
  placeholder,
  icon,
  className
}: FormInputProps) => {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={FORM_INPUTS.TYPES[type]}
          {...register(name)}
          className={`
            block w-full px-3 py-2 rounded-lg border
            ${error ? 'border-red-300' : 'border-gray-300'}
            ${icon ? 'pl-10' : ''}
            focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500
          `}
          placeholder={placeholder}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
    </div>
  );
}; 