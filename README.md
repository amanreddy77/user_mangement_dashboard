# User Management Dashboard

A full-stack web application for managing users with a modern, responsive interface. Built with React.js frontend and Node.js/Express backend, connected to MongoDB.

## 📸 Screenshots

### Dashboard View
![Dashboard](screenshots/Screenshot%202025-09-04%20at%2021.50.02.png)
*Main dashboard showing user cards with search and pagination*

### User Details View
![User Details](screenshots/Screenshot%202025-09-04%20at%2021.50.19.png)
*Detailed user information page with contact details and address*

### Dark Mode
![Dark Mode](screenshots/Screenshot%202025-09-04%20at%2021.50.48.png)
*Dark mode interface with professional styling*

## 🚀 Features

### Frontend Features
- **Dashboard**: View all users with pagination and search functionality
- **User Creation**: Add new users with comprehensive form validation
- **User Details**: View detailed user information in a clean layout
- **User Editing**: Update user information with pre-populated forms
- **User Deletion**: Remove users with confirmation dialogs
- **Dark Mode**: Toggle between light and dark themes with persistent preference
- **Responsive Design**: Mobile-first design using Tailwind CSS
- **Real-time Feedback**: Toast notifications for user actions
- **Form Validation**: Client-side validation with error messages

### Backend Features
- **RESTful API**: Complete CRUD operations for user management
- **Data Validation**: Server-side validation using express-validator
- **Error Handling**: Comprehensive error handling and responses
- **Database Integration**: MongoDB with Mongoose ODM
- **Security**: CORS, Helmet, and input sanitization
- **Pagination**: Efficient data retrieval with pagination support
- **Search**: Full-text search across user fields

## 🛠️ Tech Stack

### Frontend
- **React.js 18** - Modern React with functional components and hooks
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **React Hook Form** - Form management and validation
- **React Hot Toast** - Toast notifications
- **Lucide React** - Modern icon library
- **Tailwind CSS** - Utility-first CSS framework

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Express Validator** - Input validation middleware
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **Morgan** - HTTP request logger

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **MongoDB** (v4.4 or higher)
- **npm**  package manager

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd user-management-dashboard
```

### 2. Install Dependencies

Install all dependencies for both frontend and backend:

```bash
npm run install-all
```

Or install them separately:

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Environment Setup

Create a `.env` file in the backend directory:

```bash
cd backend
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/user-management
NODE_ENV=development
```

### 4. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# On macOS with Homebrew
brew services start mongodb-community

# On Ubuntu/Debian
sudo systemctl start mongod

# On Windows
net start MongoDB
```

### 5. Run the Application

#### Option 1: Run both frontend and backend simultaneously

```bash
npm run dev
```

#### Option 2: Run frontend and backend separately

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm start
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000

## 📚 API Documentation

### Base URL
```
http://localhost:8000/api
```

### Endpoints

#### Get All Users
```http
GET /api/users
Query Parameters:
- page: Page number (default: 1)
- limit: Items per page (default: 10)
- search: Search term for name, email, or company
```

#### Get Single User
```http
GET /api/users/:id
```

#### Create User
```http
POST /api/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "company": "Acme Corp",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "zipcode": "10001",
    "geo": {
      "lat": 40.7128,
      "lng": -74.0060
    }
  }
}
```

#### Update User
```http
PUT /api/users/:id
Content-Type: application/json

{
  // Same structure as create user
}
```

#### Delete User
```http
DELETE /api/users/:id
```

## 🗄️ Database Schema

### User Model
```javascript
{
  name: String (required, 2-50 characters)
  email: String (required, unique, valid email format)
  phone: String (required, valid phone format)
  company: String (required, 2-100 characters)
  address: {
    street: String (required)
    city: String (required)
    zipcode: String (required)
    geo: {
      lat: Number (required, -90 to 90)
      lng: Number (required, -180 to 180)
    }
  }
  createdAt: Date (auto-generated)
  updatedAt: Date (auto-generated)
}
```

## 🎨 UI Components

### Pages
- **Dashboard** (`/`) - Main user listing with search and pagination
- **Create User** (`/users/new`) - Form to add new users
- **User Details** (`/users/:id`) - Detailed user view
- **Edit User** (`/users/:id/edit`) - Form to update user information

### Components
- **UserCard** - Individual user display card
- **SearchBar** - Search functionality
- **LoadingSpinner** - Loading states
- **Navbar** - Navigation header

## 🔧 Development

### Project Structure
```
user-management-dashboard/
├── backend/
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── userRoutes.js
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── tailwind.config.js
├── package.json
└── README.md
```

### Available Scripts

#### Root Level
- `npm run dev` - Run both frontend and backend
- `npm run install-all` - Install all dependencies

#### Backend
- `npm run dev` - Run backend with nodemon
- `npm start` - Run backend in production mode

#### Frontend
- `npm start` - Run frontend development server
- `npm run build` - Build for production
- `npm test` - Run tests

## 🚀 Deployment

### Backend Deployment
1. Set environment variables for production
2. Build and start the application
3. Ensure MongoDB is accessible

### Frontend Deployment
1. Build the production bundle: `npm run build`
2. Deploy the `build` folder to your hosting service
3. Update API URLs for production

## 🧪 Testing

The application includes comprehensive validation and error handling:

- **Client-side validation** using React Hook Form
- **Server-side validation** using Express Validator
- **Error boundaries** for graceful error handling
- **Toast notifications** for user feedback

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🔒 Security Features

- **Input validation** on both client and server
- **CORS** configuration
- **Helmet** security headers
- **MongoDB injection** protection via Mongoose
- **Error sanitization** in production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Aman Reddy**  
Portfolio: [https://portfolio-aman-gamma.vercel.app/](https://portfolio-aman-gamma.vercel.app/)

Created as a Full-Stack Developer Intern Assignment.

## 📞 Support

If you encounter any issues or have questions, please create an issue in the repository.

---

**Happy Coding! 🚀**
