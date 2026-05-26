import React, { useEffect } from 'react';
import NextLink from 'next/link';
import { connect } from 'react-redux';
import { userRagistration } from '../../../../store/action/user/AddData';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { UservalidationSchema } from '../../../validation';
import AOS from 'aos';
import 'aos/dist/aos.css';

const CreateNewAccount = ({ dispatch, res }) => {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(UservalidationSchema),
    defaultValues: {
      first_name: '',
      email: '',
      mobile: '',
      whats_app: false,
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data) => {
    const formData = {
      ...data,
      whats_app: data.whats_app ? 1 : 0,
    };
    dispatch(userRagistration(formData));
  };

  useEffect(() => {
    const response = res?.data?.data;
    if (response) {
      if (response.code === 201) {
        toast.success(response.message, { position: 'top-center' });
        setTimeout(() => {
          window.location = '/student-login';
        }, 1200);
      }
      if (response.code === 409) {
        toast.warning(response.message, { position: 'top-center' });
      }
    }
  }, [res]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center px-4 py-12">
      <ToastContainer theme="light" position="top-center" autoClose={2500} />

      <div
        data-aos="fade-up"
        className="w-full max-w-lg bg-white border border-gray-200 rounded-2xl shadow-xl shadow-gray-200/50 p-8 md:p-10"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Create New Account
          </h2>
          <p className="mt-3 text-gray-600 text-sm md:text-base">
            Join our learning platform today
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <input
                type="text"
                id="first_name"
                {...register('first_name')}
                className={`peer w-full px-4 pt-6 pb-2 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 ${
                  errors.first_name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                }`}
                placeholder=" "
              />
              <label
                htmlFor="first_name"
                className="absolute left-4 top-2 text-xs font-medium text-gray-500 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-600 transition-all pointer-events-none"
              >
                Full Name *
              </label>
              {errors.first_name && (
                <p className="mt-1 text-xs text-red-600">{errors.first_name.message}</p>
              )}
            </div>

            <div className="relative">
              <input
                type="email"
                id="email"
                {...register('email')}
                className={`peer w-full px-4 pt-6 pb-2 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 ${
                  errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                }`}
                placeholder=" "
              />
              <label
                htmlFor="email"
                className="absolute left-4 top-2 text-xs font-medium text-gray-500 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-600 transition-all pointer-events-none"
              >
                Work Email *
              </label>
              {errors.email && (
                <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Mobile + WhatsApp */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
            <div className="relative">
              <input
                type="tel"
                id="mobile"
                {...register('mobile')}
                className={`peer w-full px-4 pt-6 pb-2 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 ${
                  errors.mobile ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                }`}
                placeholder=" "
              />
              <label
                htmlFor="mobile"
                className="absolute left-4 top-2 text-xs font-medium text-gray-500 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-600 transition-all pointer-events-none"
              >
                Mobile Number *
              </label>
              {errors.mobile && (
                <p className="mt-1 text-xs text-red-600">{errors.mobile.message}</p>
              )}
            </div>

            <div className="flex items-center space-x-3 pb-3">
              <input
                type="checkbox"
                id="whats_app"
                {...register('whats_app')}
                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="whats_app" className="text-gray-700 text-sm cursor-pointer">
                Use WhatsApp
              </label>
            </div>
          </div>

          {/* Password + Confirm */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <input
                type="password"
                id="password"
                {...register('password')}
                className={`peer w-full px-4 pt-6 pb-2 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 ${
                  errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                }`}
                placeholder=" "
              />
              <label
                htmlFor="password"
                className="absolute left-4 top-2 text-xs font-medium text-gray-500 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-600 transition-all pointer-events-none"
              >
                Password *
              </label>
              {errors.password && (
                <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div className="relative">
              <input
                type="password"
                id="confirmPassword"
                {...register('confirmPassword')}
                className={`peer w-full px-4 pt-6 pb-2 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 ${
                  errors.confirmPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                }`}
                placeholder=" "
              />
              <label
                htmlFor="confirmPassword"
                className="absolute left-4 top-2 text-xs font-medium text-gray-500 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-600 transition-all pointer-events-none"
              >
                Confirm Password *
              </label>
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3.5 px-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold rounded-xl shadow-md shadow-blue-200/50 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              Create Account
            </button>
          </div>

          {/* Footer links */}
          <div className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{' '}
            <NextLink
              href="/student-login"
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              Login Now
            </NextLink>
          </div>
        </form>
      </div>

      {/* Optional logo at bottom */}
      {/* <div className="mt-12 opacity-80 hover:opacity-100 transition-opacity">
        <img src="/img/logo.png" alt="Logo" className="h-12 md:h-14" />
      </div> */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  res: state.userRagistration,
});

export default connect(mapStateToProps)(CreateNewAccount);