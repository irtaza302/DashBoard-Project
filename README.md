# Gas App - Advanced MERN Stack Application

A modern, full-stack web application built with MongoDB, Express.js, React, and Node.js (MERN), featuring advanced profile management capabilities and real-time analytics.

## 🚀 Features

- **Advanced Profile Management**
  - CRUD operations with real-time updates
  - PDF generation and bulk download
  - Form validation using Zod
  - File upload support
  - Search and filtering capabilities

- **Rich Data Visualization**
  - Interactive charts using Recharts
  - Profile timeline analysis
  - Education matrix visualization
  - Real-time statistics

- **Modern Tech Stack**
  - React 18 with TypeScript
  - Redux Toolkit for state management
  - RTK Query for API integration
  - Tailwind CSS for styling
  - Headless UI components

- **Performance Optimized**
  - Code splitting and lazy loading
  - Memoized components
  - Optimistic updates
  - Progressive Web App (PWA) support

## 🛠️ Technical Stack

### Frontend
- React 18.3
- TypeScript
- Redux Toolkit & RTK Query
- React Router v6
- React Hook Form
- Zod Validation
- Tailwind CSS
- Headless UI
- React PDF
- Recharts

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS
- dotenv

### Development Tools
- Vite
- ESLint
- TypeScript ESLint
- Prettier
- Concurrently

## 🚦 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/irtaza302/DashBoard-Project.git
   cd gas-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Create a `.env` file in the root directory.
   - Add the following environment variables:
     ```
     PORT=5000
     MONGODB_URI=your_mongodb_connection_string
     ```

4. **Seed the database (optional)**
   ```bash
   npm run seed
   ```

5. **Run the application**
   - For development:
     ```bash
     npm run dev:full
     ```
   - For production build:
     ```bash
     npm run build
     npm run server
     ```

6. **Access the application**
   - Open your browser and go to `http://localhost:5000` to access the application.

## 📚 Documentation

- **API Endpoints**
  - `/api/profiles` - CRUD operations for profiles
  - `/health` - Health check endpoint

- **Frontend Routes**
  - `/dashboard` - Main dashboard with analytics
  - `/profile` - Profile management
  - `/about` - About page

## 🧪 Testing

- Run ESLint for code quality checks:
  ```bash
  npm run lint
  ```

- TypeScript type checking:
  ```bash
  npm run typecheck
  ```

## 📦 Deployment

- The application is configured for deployment on Vercel. Use the `vercel-build` script for building the project:
  ```bash
  npm run vercel-build
  ```

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## 📄 License

This project is licensed under the MIT License.

## 📧 Contact

For any inquiries, please contact [malikirtza302@hotmail.com](malikiraza96@gmail.com).
