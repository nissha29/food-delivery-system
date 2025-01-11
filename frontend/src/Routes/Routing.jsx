import React from 'react'
import LandingPage from '../Pages/LandingPage'
import AdminDashboard from '../Pages/AdminDashboard'
import Home from '../Pages/Home'

function Routing() {
  return (
    <div>
        <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="/home" element={<Home/>} />
            <Route path="/admin" element={
                <ProtectedRoute>
                    <AdminDashboard/>
                </ProtectedRoute>
            } />
        </Routes>
    </div>
  )
}

export default Routing