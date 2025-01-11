import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function ProtectedRoute() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.get('/api/auth/verify', { 
          withCredentials: true 
        });
        console.log(response.data);
        if (response.data.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/home');
        }
      } catch (err) {
        console.error('Authentication error:', err);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return null;
}

export default ProtectedRoute;