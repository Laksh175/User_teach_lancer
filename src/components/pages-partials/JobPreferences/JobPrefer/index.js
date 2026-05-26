import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { jobPrefrenceAdd } from '../../../../store/action/compuny/AddData';
import { JobvalidationSchema } from '../../../validation';
// import ProfileSide from '../Profile/Index';
import ProfileSide from '../../CompanyDashBoard/Profile/Index';


const JobPrefer = ({ dispatch, res }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(JobvalidationSchema),
    defaultValues: {
      type: '',
      position: '',
      description: '',
      technology: '',
      salary: '',
      active: '',
      vacancy: '',
    },
  });

  const onSubmit = (formValues) => {
    dispatch(jobPrefrenceAdd(formValues));
  };

  // Toast & redirect on success
  useEffect(() => {
    const response = res?.data?.data;
    if (response?.code === 201) {
      toast.success(response.message || 'Job preference posted successfully!', {
        position: 'top-center',
      });
      reset(); // clear form
      setTimeout(() => {
        window.location.href = '/company-dashboard/job-view';
      }, 1800);
    } else if (response?.message) {
      toast.error(response.message, { position: 'top-center' });
    }
  }, [res, reset]);

  return (
    <>
      <ToastContainer position="top-center" autoClose={4000} hideProgressBar />

      <div className="min-h-screen bg-gray-50">
        <div className="flex flex-col md:flex-row max-w-7xl mx-auto">
          {/* Sidebar */}
          <ProfileSide />

          {/* Main Form Content */}
          <main className="flex-1 p-6 md:p-8 lg:p-10">
            <div className="bg-gradient-to-r from-[#212A41] to-[#3DC0DF] text-white rounded-2xl shadow-xl p-8 md:p-12 mb-10 text-center">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                Post a Job Preference
              </h1>
              <p className="mt-3 text-lg opacity-90">
                Define the kind of candidates you're looking for
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-6 md:p-10 lg:p-12">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  {/* Job Type */}
                  <div>
                    <label className="block text-lg font-semibold text-gray-800 mb-3">
                      Job Type *
                    </label>
                    <div className="flex flex-wrap gap-8">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          value="1"
                          {...register('type')}
                          className="w-5 h-5 text-[#3DC0DF] border-gray-300 focus:ring-[#3DC0DF]"
                        />
                        <span className="text-gray-700 text-lg">In-office</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          value="2"
                          {...register('type')}
                          className="w-5 h-5 text-[#3DC0DF] border-gray-300 focus:ring-[#3DC0DF]"
                        />
                        <span className="text-gray-700 text-lg">Remote</span>
                      </label>
                    </div>
                    {errors.type && (
                      <p className="mt-2 text-red-600 text-sm">{errors.type.message}</p>
                    )}
                  </div>

                  {/* Position */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Position / Role *
                    </label>
                    <input
                      type="text"
                      {...register('position')}
                      placeholder="e.g. React Developer, Sales Executive"
                      className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3DC0DF] focus:border-[#3DC0DF] bg-gray-50"
                    />
                    {errors.position && (
                      <p className="mt-1 text-red-600 text-sm">{errors.position.message}</p>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Description *
                    </label>
                    <textarea
                      {...register('description')}
                      placeholder="Describe the role, responsibilities, requirements..."
                      rows={5}
                      className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3DC0DF] focus:border-[#3DC0DF] resize-none bg-gray-50"
                    />
                    {errors.description && (
                      <p className="mt-1 text-red-600 text-sm">{errors.description.message}</p>
                    )}
                  </div>

                  {/* Vacancy */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Vacancies *
                    </label>
                    <input
                      type="number"
                      {...register('vacancy')}
                      placeholder="e.g. 5"
                      min="1"
                      className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3DC0DF] focus:border-[#3DC0DF] bg-gray-50"
                    />
                    {errors.vacancy && (
                      <p className="mt-1 text-red-600 text-sm">{errors.vacancy.message}</p>
                    )}
                  </div>

                  {/* Technology / Skills */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Required Technology / Skills *
                    </label>
                    <input
                      type="text"
                      {...register('technology')}
                      placeholder="e.g. React, Node.js, Python, AWS..."
                      className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3DC0DF] focus:border-[#3DC0DF] bg-gray-50"
                    />
                    {errors.technology && (
                      <p className="mt-1 text-red-600 text-sm">{errors.technology.message}</p>
                    )}
                  </div>

                  {/* Salary */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expected Salary Range *
                    </label>
                    <input
                      type="text"
                      {...register('salary')}
                      placeholder="e.g. ₹5-8 LPA or Negotiable"
                      className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3DC0DF] focus:border-[#3DC0DF] bg-gray-50"
                    />
                    {errors.salary && (
                      <p className="mt-1 text-red-600 text-sm">{errors.salary.message}</p>
                    )}
                  </div>

                  {/* Active Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Job Status
                    </label>
                    <div className="flex gap-8">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          value="1"
                          {...register('active')}
                          className="w-5 h-5 text-[#3DC0DF] border-gray-300 focus:ring-[#3DC0DF]"
                        />
                        <span className="text-gray-700 font-medium">Active (Accepting Applications)</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          value="0"
                          {...register('active')}
                          className="w-5 h-5 text-[#3DC0DF] border-gray-300 focus:ring-[#3DC0DF]"
                        />
                        <span className="text-gray-700 font-medium">Inactive (Not Accepting)</span>
                      </label>
                    </div>
                    {errors.active && (
                      <p className="mt-2 text-red-600 text-sm">{errors.active.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="text-center pt-10">
                    <button
                      type="submit"
                      className="px-12 py-4 bg-[#212A41] hover:bg-[#3DC0DF] text-white font-bold text-lg rounded-xl transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-[#3DC0DF] focus:ring-offset-2"
                    >
                      Post Job Preference
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  res: state.jobPrefrenceAdd,
});

export default connect(mapStateToProps)(JobPrefer);