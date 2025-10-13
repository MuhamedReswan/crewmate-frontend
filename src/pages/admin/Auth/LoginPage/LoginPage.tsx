import { Eye, EyeOff, Lock, Mail, ArrowRight } from 'lucide-react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '@/components/common/Message/Error.message';
import SuccessMessage from '@/components/common/Message/SuccessMessage';
import { useToast } from '@/hooks/use-toast';
import { useLoginForm } from '@/hooks/useLoginForm';
import { adminLogin } from '@/redux/slice/adminAuth.slice';
import { ApiResponse } from '@/types/apiTypes/ApiResponse';
import { Role } from '@/types/enum.type';
import { Admin } from '@/types/users.type';
import { getApiErrorMessage } from '@/utils/apiErrorHanldler';

function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();



  const {
    register,
    onSubmit,
    errors,
    isLoading,
  } = useLoginForm<ApiResponse<Partial<Admin>>>({
    loginType: Role.ADMIN,
    onLoginSuccess: (data) => {
      console.log('Login successful data admin', data);

      toast({
        description: <SuccessMessage message={data.message} className="" />,
      });

      if (data.data) {
        dispatch(adminLogin(data.data));
        navigate('/admin/');
      }
    },
    onLoginError: (error) => {
      console.error('Login failed admin', error);
      toast({
        description: <ErrorMessage message={getApiErrorMessage(error)} />,
      });
    },
  });



  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4B49AC]/90 to-[#6C7DAC] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left side - Brand/Logo */}
        <div className="md:w-5/12 bg-[#4B49AC]/10 p-8 flex flex-col justify-center relative">
          <div className="absolute top-8 left-8">
            <div className="flex items-center">
              <div className="bg-[#4B49AC] text-white p-2 rounded-lg mr-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" />
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-xl font-bold text-[#4B49AC]">CrewMate</span>
            </div>
          </div>

          <div className="mt-16 mb-8">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Team collaboration"
              className="rounded-xl shadow-lg"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-[#4B49AC] font-bold text-xl">Manage Your Team</h3>
            <p className="text-gray-600">
              Track productivity, assign tasks, and boost team performance with our comprehensive dashboard.
            </p>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="md:w-7/12 p-8 md:p-12">
          <div className="max-w-md mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800">Welcome back</h2>
              <p className="text-gray-500 mt-2">Please enter your credentials to access the admin dashboard</p>
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    {...register('email')}
                    className="block w-full pl-10 pr-3 py-3 border rounded-lg"
                    placeholder="admin@crewmate.com"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                    className="block w-full pl-10 pr-10 py-3 border rounded-lg text-gray-400"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-[#4B49AC] text-white rounded-lg shadow-sm text-center"
              >
                <span> {isLoading ? "Sign In..." : "Sign in"}</span>
                <ArrowRight size={16} className="ml-2" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;