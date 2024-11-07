# Gas App - Advanced MERN Stack Application

A modern, full-stack web application built with MongoDB, Express.js, React, and Node.js (MERN), featuring advanced profile management capabilities and real-time analytics.

## 🚀 Features

- **User Authentication**
  - Secure login with email and password
  - Role-based access control (Admin/User)
  - Persistent sessions with local storage
  - Error handling and user feedback with toast notifications

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
- **React 18.3**: A JavaScript library for building user interfaces.
- **TypeScript**: A strongly typed programming language that builds on JavaScript.
- **Redux Toolkit & RTK Query**: For efficient state management and API data fetching.
- **React Router v6**: Declarative routing for React applications.
- **React Hook Form**: Performant, flexible, and extensible forms with easy-to-use validation.
- **Zod Validation**: TypeScript-first schema declaration and validation library.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Headless UI**: Unstyled, fully accessible UI components.
- **React PDF**: Create PDF documents using React components.
- **Recharts**: A composable charting library built on React components.

### Backend
- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB with Mongoose**: NoSQL database with elegant MongoDB object modeling.
- **CORS**: Middleware to enable Cross-Origin Resource Sharing.
- **dotenv**: Module to load environment variables from a `.env` file.

### Development Tools
- **Vite**: Next-generation frontend tooling for fast development.
- **ESLint**: Pluggable linting utility for JavaScript and TypeScript.
- **TypeScript ESLint**: Linting for TypeScript.
- **Prettier**: Code formatter for consistent style.
- **Concurrently**: Run multiple commands concurrently.

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
  - `/api/auth/login` - User login endpoint
  - `/api/profiles` - CRUD operations for profiles
  - `/health` - Health check endpoint

- **Frontend Routes**
  - `/dashboard` - Main dashboard with analytics
  - `/profile` - Profile management
  - `/about` - About page
  - `/account` - User management (Admin only)

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

## 🛠️ Troubleshooting

- **Backend Server Not Running**: If you encounter a `ECONNREFUSED` error when accessing API endpoints, ensure that both the frontend and backend servers are running. Use the `npm run dev:full` command to start both servers simultaneously.
- **Port Conflicts**: Ensure that port 5000 is not in use by another application. The `preserver` script can help terminate any process using this port.
- **MongoDB Connection**: Verify that your MongoDB instance is running and the `MONGODB_URI` in your `.env` file is correct.

## 🔐 Authentication Details

- **Login Process**: Users can log in using their email and password. The login form is validated using Zod, and upon successful authentication, user data is stored in local storage for session persistence.
- **Role-Based Access**: The application supports role-based access control, allowing only admin users to access certain routes, such as user management.
- **Error Handling**: The application provides user-friendly error messages and feedback using toast notifications, ensuring a smooth user experience.

## 📊 Data Visualization

- **Interactive Charts**: The dashboard features interactive charts for visualizing profile data, including graduation trends, degree distribution, and profile timelines.
- **Real-Time Updates**: The application supports real-time updates, ensuring that users always have access to the latest data.

This README now provides a comprehensive overview of the application, highlighting key features, technical details, and user authentication processes. Let me know if there's anything else you'd like to add or modify!
