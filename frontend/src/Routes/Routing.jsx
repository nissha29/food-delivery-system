import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from '../Pages/LandingPage.jsx'
import AdminDashboard from '../Pages/AdminDashboard.jsx'
import Home from '../Pages/Home.jsx'
import ProtectedRoute from '../Routes/ProtectedRoute.jsx'
import { AuthContextProvider } from '../Context/AuthContext.jsx'

function Routing() {
  return (
    <div>
      <AuthContextProvider>
        <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="/home" element={<Home/>} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminDashboard/>
              </ProtectedRoute>} 
            />
        </Routes>
      </AuthContextProvider>
    </div>
  )
}

export default Routing