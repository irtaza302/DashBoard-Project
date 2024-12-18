import { ProfileFormData } from "@/schemas/profile.schema";

import { formatDate } from "./date";

export const validateFormData = (data: ProfileFormData): ProfileFormData => {
    return {
        ...data,
        education: {
            ...data.education,
            completionYear: Number(data.education.completionYear)
        },
        expiryDate: formatDate(data.expiryDate),
        portfolio: data.portfolio || '',
        githubLink: data.githubLink || ''
    };
}; 