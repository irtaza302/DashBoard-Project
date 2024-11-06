import { ProfileFormData } from '../schemas/profile.schema';

type SortField = 
  | 'name'
  | 'email'
  | 'education.degree'
  | 'education.completionYear'
  | 'expiryDate';

export const sortProfiles = (
  profiles: ProfileFormData[],
  field: SortField,
  direction: 'asc' | 'desc'
) => {
  return [...profiles].sort((a, b) => {
    let compareA: string | number;
    let compareB: string | number;

    // Handle nested fields
    switch (field) {
      case 'education.degree':
        compareA = a.education?.degree ?? '';
        compareB = b.education?.degree ?? '';
        break;
      case 'education.completionYear':
        compareA = a.education?.completionYear ?? 0;
        compareB = b.education?.completionYear ?? 0;
        break;
      case 'expiryDate':
        compareA = new Date(a.expiryDate).getTime();
        compareB = new Date(b.expiryDate).getTime();
        break;
      default:
        compareA = a[field as keyof Omit<ProfileFormData, 'education' | 'expiryDate'>] ?? '';
        compareB = b[field as keyof Omit<ProfileFormData, 'education' | 'expiryDate'>] ?? '';
    }

    if (compareA < compareB) return direction === 'asc' ? -1 : 1;
    if (compareA > compareB) return direction === 'asc' ? 1 : -1;
    return 0;
  });
}; 