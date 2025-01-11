import React, { useState } from 'react';
import Register from './Register';
import axios from 'axios';
import URL from '../../constant.js'

const Login = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  async function handleChange(e){
    setFormData([
        ...formData,
        [e.target.username] = e.target.value
    ])
  }
  async function handleSubmit(){
    e.preventDefault();
    try{
        const response = await axios.post(
            `${URL}/api/auth/login`,
            formData,
            {
                withCredentials: true,
            }
            
        )
    }catch(err){
        if (err.response) {
            if (err.response.status === 404) {
              setError('User does not exist');
            } else if (err.response.status === 500) {
              setError('Server error');
            } else {
              setError(err.response.data.message || 'An error occurred');
            }
          }
    }
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Login</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ✕
          </button>
        </div>
        
    
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              value={formData.username}
              id='username'
              name='username'
              placeholder='Enter Username'
              autoComplete='username'
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              value={formData.password}
              id='password'
              name='password'
              placeholder='Enter Password'
              onChange={handleChange}
              required
            />
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="w-full bg-primary text-white py-2 rounded hover:bg-yellow-500 transition-colors duration-200"
          >
            Login
          </button>
        </form>
        <div className='mt-2 text-sm text-center cursor-pointer'>
            <div>New User? <span onClick={()=>{
                setIsOpen(prev => !prev);
            }} className='text-primary hover:underline'>Register here</span></div>
        </div>
      </div>
      {isOpen && <div className='relative'>
        <Register className="absolute top-1/2 left-1/2 right-1/2 bottom-1/2" onClose={()=>{
          setIsOpen(false);
          onClose();
        }}/>
      </div>}
    </div>
  );
};

export default Login;