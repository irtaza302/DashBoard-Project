import { FC } from 'react';

export const About: FC = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">About Gas App</h1>
      
      <div className="space-y-6">
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-600">
            Gas App is dedicated to revolutionizing the way we manage and monitor gas consumption. 
            Our platform provides innovative solutions for both residential and commercial users.
          </p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Key Features</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Real-time gas consumption monitoring</li>
            <li>Advanced analytics and reporting</li>
            <li>User profile management</li>
            <li>Interactive dashboards</li>
            <li>Automated billing system</li>
          </ul>
        </section>

        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          <div className="text-gray-600">
            <p>Email: support@gasapp.com</p>
            <p>Phone: (555) 123-4567</p>
            <p>Address: 123 Energy Street, Power City, PC 12345</p>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Version Information</h2>
          <div className="text-gray-600">
            <p>Current Version: 1.0.0</p>
            <p>Last Updated: March 2024</p>
            <p>Framework: React + TypeScript</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About; 