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
    expiryDate: new Date("2026-05-15"),
    studentCard: "STU2024002",
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
    expiryDate: new Date("2027-08-20"),
    studentCard: "STU2025003",
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
    expiryDate: new Date("2026-12-31"),
    studentCard: "STU2024004",
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
    expiryDate: new Date("2025-09-30"),
    studentCard: "STU2023005",
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
    expiryDate: new Date("2026-07-15"),
    studentCard: "STU2024006",
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
    expiryDate: new Date("2025-11-30"),
    studentCard: "STU2023007",
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
    expiryDate: new Date("2027-04-15"),
    studentCard: "STU2025008",
    portfolio: "https://danielkim.data",
    githubLink: "https://github.com/dkim"
  },
  {
    name: "Irtaza malik",
    email: "malikirtaza302@hotmail.com",
    contact: "923035737327",
    address: "House 312, Sector B1, Block 13, Township",
    education: {
      degree: "BSCD",
      completionYear: 2000
    },
    studentCard: "2113123123",
    expiryDate: new Date("2024-12-26"),
    portfolio: "",
    githubLink: ""
  },
  {
    name: "Irtaza malik",
    email: "malikirtaza302@hotmail.com",
    contact: "10201203012",
    address: "House 312, Sector B1, Block 13, Township",
    education: {
      degree: "BSCD",
      completionYear: 2024
    },
    studentCard: "F2010232321",
    expiryDate: new Date("2024-10-31"),
    portfolio: "",
    githubLink: ""
  }
];

async function seedDatabase() {
  let connection;
  try {
    // Connect to MongoDB with options
    connection = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log('🌟 Connected to MongoDB');

    // Clear existing data
    const deletedCount = await Profile.deleteMany({});
    console.log(`🧹 Cleared ${deletedCount.deletedCount} existing profiles`);

    // Insert new data
    const insertedProfiles = await Profile.insertMany(dummyProfiles, { 
      ordered: true,
      lean: true 
    });
    
    console.log(`✅ Successfully inserted ${insertedProfiles.length} profiles`);
    console.log('\n📊 Sample profile:');
    console.log(JSON.stringify(insertedProfiles[0], null, 2));

  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await mongoose.connection.close();
      console.log('📡 Database connection closed');
    }
    process.exit(0);
  }
}

// Run the seeding function
seedDatabase();