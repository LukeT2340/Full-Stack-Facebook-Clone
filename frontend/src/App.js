import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React from 'react';
import { useAuthContext } from './hooks/useAuthContext.js';
import Home from './pages/Home.js';
import NavigationBar from './sharedComponents/NavigationBar.js';
import Footer from './sharedComponents/Footer.js';
import Login from './pages/Login.js';
import { useProfile } from './hooks/useProfile';

function App() {
  const { user } = useAuthContext();
  const { profile, isProfileLoading } = useProfile(user ? user.user_id : null);

  if (isProfileLoading) {
    return <>Loading...</>; 
  }

  return (
    <Router className="App">
      <div className="d-flex flex-column min-vh-100 justify-content-between">
        {user && profile && <NavigationBar profile={profile}/>}
        <Routes>
          {/* Pages only available to unauthenticated users */}
          {!user && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
          {/* Pages only available to authenticated users */}
          {user && profile && (
            <>
              <Route path="/home" element={<Home profile={profile} />} />
              <Route path="*" element={<Navigate to="/home" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

/*         <Footer />
*/