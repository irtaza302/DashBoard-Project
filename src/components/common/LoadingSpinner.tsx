import { cva, type VariantProps } from 'class-variance-authority';

const spinnerVariants = cva(
  "animate-spin rounded-full border-solid border-t-transparent",
  {
    variants: {
      size: {
        sm: "h-4 w-4 border-2",
        md: "h-8 w-8 border-3",
        lg: "h-12 w-12 border-4",
      },
      color: {
        primary: "border-indigo-600",
        white: "border-white",
        gray: "border-gray-300",
      }
    },
    defaultVariants: {
      size: "md",
      color: "primary"
    }
  }
);

interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
  className?: string;
}

export const LoadingSpinner = ({ size, color, className }: SpinnerProps) => (
  <div className={spinnerVariants({ size, color, className })} />
); 