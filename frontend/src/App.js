import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import React, { useState } from 'react'
import { useAuthContext } from './hooks/useAuthContext.js'
import Home from './pages/Home.js'
import NavigationBar from './sharedComponents/NavigationBar.js'
import Footer from './sharedComponents/Footer.js'
import Login from './pages/Login.js'


function App() {
  const { user } = useAuthContext();

  return (
    <Router className="App">
        <div className="d-flex flex-column min-vh-100 justify-content-between"> 
          <NavigationBar />
            <Routes> 

            { /* Pages only available to unauthenticated users */ }
            {!user && (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </>
            )}
            { /* Pages only available to authenticated users */ }
            {user && (
              <>
                <Route path="/home" element={<Home />} />
                <Route path="*" element={<Navigate to="/home" />} />
              </>
            )}
            </Routes>
          <Footer />

          </div>
            
    </Router>
  )
}

export default App;