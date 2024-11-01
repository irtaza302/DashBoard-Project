export interface EducationProps {
  profiles: Array<{
    education: {
      degree: string;
      completionYear: number;
    };
    name: string;
    expiryDate: string;
  }>;
}

export interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: {
      date: string;
      value: number;
    };
  }>;
  label?: string;
} 