import React, { useEffect, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { connect } from "react-redux";
import { compunyLogin } from '../../../../store/action/compuny/AddData';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from '../../../validation';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Mail, Lock, LogIn } from 'lucide-react'; // Optional: npm install lucide-react

const LoginForm = ({ dispatch, res }) => {
  const router = useRouter();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const [data, setData] = useState({ email: '', password: '' });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const onSubmit = async () => {
    dispatch(compunyLogin(data));
  };

  useEffect(() => {
    const response = res.data ? res.data.data : null;
    console.log('Login Response:', response); // Debugging
    
    if (response) {
      if (response.code === 200) {
        toast.success(response.message, { position: "top-center" });
        setTimeout(() => {
          router.push('/company');
        }, 1500);
      } else if (response.code === 401 || response.code === 400) {
        toast.error(response.message, { position: "top-center" });
      } else if (response.error || response.code >= 500) {
        toast.error(response.message || 'Login failed. Please ensure the backend server is running at http://localhost:3006', { position: "top-center" });
      } else {
        toast.warning(response.message, { position: "top-center" });
      }
    }
  }, [res, router]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      
      {/* Logo Area */}
      <div className="mb-8" data-aos="fade-down">
        <NextLink href="/">
          <img src="/img/logo.png" alt="Logo" className="h-12 w-auto cursor-pointer" />
        </NextLink>
      </div>

      <div className="w-full max-w-md" data-aos="zoom-in">
        <div className="bg-white py-10 px-8 rounded-[2rem] shadow-2xl shadow-slate-200 border border-slate-100">
          
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome Back
            </h2>
            <p className="text-slate-500 mt-2 text-sm font-medium">
              Please enter your company credentials
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                <Mail size={16} className="text-[#3DC0DF]" /> Email Address
              </label>
              <input
                type="email"
                placeholder="company@example.com"
                {...register('email')}
                className={`w-full px-5 py-3 rounded-xl bg-slate-50 border-2 transition-all outline-none 
                  ${errors.email ? 'border-red-400 focus:ring-red-50' : 'border-slate-100 focus:border-[#3DC0DF] focus:ring-4 focus:ring-[#3DC0DF]/10'}`}
                value={data.email}
                onChange={handleChange}
                autoComplete="email"
              />
              {errors.email && (
                <p className="text-xs font-bold text-red-500 ml-1">{errors.email?.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Lock size={16} className="text-[#3DC0DF]" /> Password
                </label>
                <NextLink href="/forget-password">
                  <span className="text-xs font-bold text-[#3DC0DF] hover:text-[#34a8c4] cursor-pointer no-underline">
                    Forgot?
                  </span>
                </NextLink>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                {...register('password')}
                className={`w-full px-5 py-3 rounded-xl bg-slate-50 border-2 transition-all outline-none 
                  ${errors.password ? 'border-red-400 focus:ring-red-50' : 'border-slate-100 focus:border-[#3DC0DF] focus:ring-4 focus:ring-[#3DC0DF]/10'}`}
                value={data.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
              {errors.password && (
                <p className="text-xs font-bold text-red-500 ml-1">{errors.password?.message}</p>
              )}
            </div>

            {/* Login Button */}
            <div className="pt-2">
              <button 
                type="submit" 
                className="w-full bg-[#202040] hover:bg-slate-800 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group active:scale-[0.98]"
              >
                <span>Login to Dashboard</span>
                <LogIn size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>

          {/* Footer Links */}
          <div className="mt-8 pt-8 border-t border-slate-50 text-center">
            <p className="text-sm text-slate-500 font-medium">
              Don't have an account?{' '}
              <NextLink href="/company-signup">
                <span className="text-[#3DC0DF] font-bold hover:underline cursor-pointer">
                  Create Account
                </span>
              </NextLink>
            </p>
            <div className="mt-4">
               <NextLink href="/" className="text-xs text-slate-400 hover:text-slate-600 no-underline">
                 New to TheDriveSales?
               </NextLink>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  res: state.compunyLogin,
});

export default connect(mapStateToProps)(LoginForm);