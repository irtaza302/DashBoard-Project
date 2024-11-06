import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Profile } from './api/models/profile.js';

dotenv.config();

const dummyProfiles = [
  {
    name: "Emma Thompson",
    email: "emma.thompson@gmail.com",
    contact: "14155552671",
    address: "742 Silicon Valley Drive, San Francisco, CA 94105, USA",
    education: {
      degree: "MSc Software Engineering",
      completionYear: 2023
    },
    studentCard: "STU2023001",
    expiryDate: new Date("2025-06-30"),
    portfolio: "https://emmathompson.dev",
    githubLink: "https://github.com/emmathompson"
  },
  {
    name: "Alexander Chen",
    email: "alex.chen@outlook.com",
    contact: "12125556789",
    address: "123 Tech Plaza, New York, NY 10012, USA",
    education: {
      degree: "BSc Computer Science",
      completionYear: 2024
    },
    studentCard: "STU2024002",
    expiryDate: new Date("2026-05-15"),
    portfolio: "https://alexchen.dev",
    githubLink: "https://github.com/alexchen"
  },
  {
    name: "Sofia Rodriguez",
    email: "sofia.r@gmail.com",
    contact: "13105557890",
    address: "567 Innovation Ave, Los Angeles, CA 90001, USA",
    education: {
      degree: "MSc Data Science",
      completionYear: 2025
    },
    studentCard: "STU2025003",
    expiryDate: new Date("2027-08-20"),
    portfolio: "https://sofiarodriguez.ai",
    githubLink: "https://github.com/sofiar"
  },
  {
    name: "James Wilson",
    email: "james.wilson@yahoo.com",
    contact: "16175558901",
    address: "890 Research Park, Boston, MA 02108, USA",
    education: {
      degree: "BSc Web Development",
      completionYear: 2024
    },
    studentCard: "STU2024004",
    expiryDate: new Date("2026-12-31"),
    portfolio: "https://jameswilson.tech",
    githubLink: "https://github.com/jwilson"
  },
  {
    name: "Aisha Patel",
    email: "aisha.patel@gmail.com",
    contact: "14085559012",
    address: "234 Developer Lane, San Jose, CA 95110, USA",
    education: {
      degree: "MSc Artificial Intelligence",
      completionYear: 2023
    },
    studentCard: "STU2023005",
    expiryDate: new Date("2025-09-30"),
    portfolio: "https://aishapatel.dev",
    githubLink: "https://github.com/aishap"
  },
  {
    name: "Lucas Schmidt",
    email: "lucas.schmidt@outlook.com",
    contact: "15125550123",
    address: "456 Coding Court, Austin, TX 78701, USA",
    education: {
      degree: "BSc Computer Science",
      completionYear: 2024
    },
    studentCard: "STU2024006",
    expiryDate: new Date("2026-07-15"),
    portfolio: "https://lucasschmidt.cloud",
    githubLink: "https://github.com/lschmidt"
  },
  {
    name: "Maya Johnson",
    email: "maya.johnson@gmail.com",
    contact: "12065551234",
    address: "789 Algorithm Road, Seattle, WA 98101, USA",
    education: {
      degree: "MSc Software Engineering",
      completionYear: 2023
    },
    studentCard: "STU2023007",
    expiryDate: new Date("2025-11-30"),
    portfolio: "https://mayajohnson.dev",
    githubLink: "https://github.com/mayaj"
  },
  {
    name: "Daniel Kim",
    email: "daniel.kim@yahoo.com",
    contact: "13035552345",
    address: "321 Database Drive, Denver, CO 80202, USA",
    education: {
      degree: "MSc Data Science",
      completionYear: 2025
    },
    studentCard: "STU2025008",
    expiryDate: new Date("2027-04-15"),
    portfolio: "https://danielkim.data",
    githubLink: "https://github.com/dkim"
  }
];

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log('Connected to MongoDB');

    // Clear existing data
    await Profile.deleteMany({});
    console.log('Cleared existing profiles');

    // Insert new data
    const result = await Profile.insertMany(dummyProfiles);
    console.log(`Inserted ${result.length} profiles`);

    // Log each inserted profile
    result.forEach((profile, index) => {
      console.log(`${index + 1}. Created profile for ${profile.name}`);
    });

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

// Run the seed function
seedDatabase();