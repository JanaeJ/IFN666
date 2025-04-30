import { Routes, Route, Navigate } from 'react-router-dom';
import Courses from './pages/Courses';
import Vocabularies from './pages/Vocabularies'; 
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import UserList from './pages/UserList'; 
import UserEdit from './pages/UserEdit'; 
import { useAuth } from './contexts/AuthContext';

export default function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
    
      <Route path="/" element={<Navigate to="/home" />} />

      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/courses" element={user ? <Courses /> : <Navigate to="/login" />} />
      <Route path="/vocabularies" element={user ? <Vocabularies /> : <Navigate to="/login" />} />
      
      <Route
        path="/users"
        element={user && user.role === 'admin' ? <UserList /> : <Navigate to="/login" />}
      />
      <Route
        path="/users/edit/:id"
        element={user && user.role === 'admin' ? <UserEdit /> : <Navigate to="/login" />}
      />

      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
}
