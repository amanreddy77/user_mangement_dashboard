import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { DarkModeProvider } from './contexts/DarkModeContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import UserForm from './pages/UserForm';
import UserDetails from './pages/UserDetails';
import EditUser from './pages/EditUser';

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <Navbar />
          <main className="min-h-screen">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users/new" element={<UserForm />} />
              <Route path="/users/:id" element={<UserDetails />} />
              <Route path="/users/:id/edit" element={<EditUser />} />
            </Routes>
          </main>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#10B981',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </div>
      </Router>
    </DarkModeProvider>
  );
}

export default App;
