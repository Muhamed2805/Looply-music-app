import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Home from './pages/Home/Home';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Search from './pages/Search/Search';
import Profile from './pages/Profile/Profile';
import EditProfile from './pages/Profile/edit/EditProfile';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Library from './pages/Library/Library';
import PlaylistDetails from './pages/Playlist/Playlist';
import { Navigate } from 'react-router-dom';

function MainLayout() {
  const location = useLocation();
  const noSidebarRoutes = ['/login', '/signup'];
  const showSidebar = !noSidebarRoutes.includes(location.pathname);

  return (
    <div style={{ display: 'flex' }}>
      {showSidebar && <Sidebar />}
      <div style={{ marginLeft: showSidebar ? '200px' : 0, flex: 1 }}>
        <Routes>
          {/* Početna ruta vodi na Home samo ako je korisnik logovan */}
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />

          <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
          <Route path="/library" element={<ProtectedRoute><Library /></ProtectedRoute>} />
          <Route path="/playlist/:playlistName" element={<ProtectedRoute><PlaylistDetails /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/profile/edit" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />

          {/* Rute koje ne zahtijevaju login */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Optional: bilo koja nepoznata ruta vodi na login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

export default App;
