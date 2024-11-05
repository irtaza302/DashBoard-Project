import { saveAs } from 'file-saver';
import { pdf } from '@react-pdf/renderer';
import { ProfileFormData } from '../schemas/profile.schema';
import { ProfilePDF } from '../components/profile/ProfilePDF';
import { createElement } from 'react';

export const downloadProfilePDF = async (profileData: ProfileFormData): Promise<void> => {
  if (!profileData) throw new Error('Profile data is required');

  try {
    const pdfDocument = createElement(ProfilePDF, { profile: profileData });
    const blob = await pdf(pdfDocument).toBlob();
    
    if (!blob) throw new Error('PDF generation failed');

    const fileName = `${profileData.name.toLowerCase().replace(/\s+/g, '-')}-profile.pdf`;
    saveAs(blob, fileName);
  } catch (error) {
    console.error('PDF generation error:', error);
    throw new Error('Failed to generate PDF');
  }
};

export const downloadMultipleProfilesPDF = async (profiles: ProfileFormData[]): Promise<void> => {
  if (!profiles?.length) throw new Error('No profiles to download');

  try {
    await Promise.all(
      profiles.map(async (profile, index) => {
        // Add delay between downloads to prevent browser throttling
        await new Promise(resolve => setTimeout(resolve, index * 500));
        await downloadProfilePDF(profile);
      })
    );
  } catch (error) {
    console.error('Bulk PDF generation error:', error);
    throw new Error('Failed to generate PDFs');
  }
}; 