import { FC } from 'react';
import { ABOUT_CONSTANTS } from '../constants/about.constants';

export const About: FC = () => {
  const { SECTIONS } = ABOUT_CONSTANTS;
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">{ABOUT_CONSTANTS.TITLE}</h1>
      
      <div className="space-y-6">
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">{SECTIONS.MISSION.TITLE}</h2>
          <p className="text-gray-600">{SECTIONS.MISSION.DESCRIPTION}</p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">{SECTIONS.FEATURES.TITLE}</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            {SECTIONS.FEATURES.LIST.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </section>

        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">{SECTIONS.CONTACT.TITLE}</h2>
          <div className="text-gray-600">
            <p>Email: {SECTIONS.CONTACT.EMAIL}</p>
            <p>Phone: {SECTIONS.CONTACT.PHONE}</p>
            <p>Address: {SECTIONS.CONTACT.ADDRESS}</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About; 