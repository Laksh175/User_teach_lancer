import React, { useEffect, useState } from 'react';
import NextLink from 'next/link';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { fetchUserView } from '../../../../store/action/user/GetData';
import { userProfileUpadte } from '../../../../store/action/user/UpdateData';
import { code } from './phone'; // Assuming this is your country code array
import ProfileSide from '../Profile/Index';

const MainPersonaldetails = ({ dispatch, res, updateres }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    phone_code: '',
    mobile: '',
    city: '',
    second_city: '',
    mother_tongue: '',
    language: '',
    linkedin_profile: '',
    about_yourself: '',
    password: '', // Note: usually not editable in profile — consider removing
  });

  const [charCount, setCharCount] = useState(0);
  const maxAboutLength = 250;

  useEffect(() => {
    dispatch(fetchUserView());
  }, [dispatch]);

  useEffect(() => {
    if (res?.data?.data?.data) {
      const user = res.data.data.data;
      setFormData(user);
    }
  }, [res]);

  // Update character count for "About yourself"
  useEffect(() => {
    setCharCount(formData.about_yourself?.length);
  }, [formData.about_yourself]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!formData.first_name || !formData.last_name) {
      toast.error('First and Last name are required', { position: 'top-center' });
      return;
    }
    if (formData.about_yourself.length > maxAboutLength) {
      toast.error(`About yourself cannot exceed ${maxAboutLength} characters`, {
        position: 'top-center',
      });
      return;
    }

    dispatch(userProfileUpadte(formData));
  };

  // Toast for update success/error
  useEffect(() => {
    const data = updateres?.data?.data;
    if (data?.code === 200) {
      toast.success(data.message || 'Profile updated successfully!', {
        position: 'top-center',
      });
      dispatch(fetchUserView()); // Refresh profile data
    } else if (data?.code && data?.message) {
      toast.error(data.message, { position: 'top-center' });
    }
  }, [updateres, dispatch]);

  return (
    <>
      <ToastContainer position="top-center" autoClose={4000} />

      <div className="min-h-screen bg-gray-50">
        <div className="flex flex-col md:flex-row max-w-7xl mx-auto">
          {/* Sidebar */}
          <ProfileSide />

          {/* Main Content */}
          <main className="flex-1 p-6 md:p-10">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              <div className="p-6 md:p-10">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-10">
                  Personal Details
                </h1>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        value={formData.first_name || ''}
                        onChange={handleChange}
                        className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all bg-gray-50"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        value={formData.last_name || ''}
                        onChange={handleChange}
                        className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all bg-gray-50"
                        required
                      />
                    </div>
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Gender
                    </label>
                    <div className="flex flex-wrap gap-6">
                      {['male', 'female', 'other'].map((g) => (
                        <label key={g} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="gender"
                            value={g}
                            checked={formData.gender === g}
                            onChange={handleChange}
                            className="w-5 h-5 text-cyan-600 border-gray-300 focus:ring-cyan-500"
                          />
                          <span className="text-gray-700 capitalize">{g}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mobile Number
                    </label>
                    <div className="flex gap-3">
                      <select
                        name="phone_code"
                        value={formData.phone_code || ''}
                        onChange={handleChange}
                        className="w-32 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-gray-50"
                      >
                        <option value="">Code</option>
                        {code.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.iso} +{c.code}
                          </option>
                        ))}
                      </select>

                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile || ''}
                        onChange={handleChange}
                        placeholder="10-digit mobile number"
                        maxLength={10}
                        className="flex-1 px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none bg-gray-50"
                      />
                    </div>
                  </div>

                  {/* Locations */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city || ''}
                        onChange={handleChange}
                        placeholder="City where you currently live"
                        className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Second City (Optional)
                      </label>
                      <input
                        type="text"
                        name="second_city"
                        value={formData.second_city || ''}
                        onChange={handleChange}
                        placeholder="Another preferred city"
                        className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none bg-gray-50"
                      />
                    </div>
                  </div>

                  {/* Mother Tongue & Preferred Language */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mother Tongue
                      </label>
                      <input
                        type="text"
                        name="mother_tongue"
                        value={formData.mother_tongue || ''}
                        onChange={handleChange}
                        placeholder="Your native language"
                        className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Preferred Language of Learning
                      </label>
                      <div className="flex gap-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="language"
                            value="1"
                            checked={formData.language === '1'}
                            onChange={handleChange}
                            className="w-5 h-5 text-cyan-600 border-gray-300 focus:ring-cyan-500"
                          />
                          <span className="text-gray-700">English</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="language"
                            value="2"
                            checked={formData.language === '2'}
                            onChange={handleChange}
                            className="w-5 h-5 text-cyan-600 border-gray-300 focus:ring-cyan-500"
                          />
                          <span className="text-gray-700">Mother Tongue</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* LinkedIn */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      LinkedIn Profile (Optional)
                    </label>
                    <input
                      type="url"
                      name="linkedin_profile"
                      value={formData.linkedin_profile || ''}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/your-profile"
                      className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none bg-gray-50"
                    />
                  </div>

                  {/* About Yourself */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        About Yourself (max 250 characters)
                      </label>
                      <span className={`text-sm ${charCount > maxAboutLength ? 'text-red-600' : 'text-gray-500'}`}>
                        {charCount}/{maxAboutLength}
                      </span>
                    </div>
                    <textarea
                      name="about_yourself"
                      value={formData.about_yourself || ''}
                      onChange={handleChange}
                      maxLength={maxAboutLength}
                      rows={6}
                      placeholder="Tell us a bit about yourself..."
                      className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none resize-none bg-gray-50"
                    />
                  </div>

                  {/* Submit */}
                  <div className="text-center pt-6">
                    <button
                      type="submit"
                      className="px-10 py-4 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-lg rounded-xl transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2"
                    >
                      Save & Next
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
  res: state.fetchUserView,
  updateres: state.userProfileUpadte,
});

export default connect(mapStateToProps)(MainPersonaldetails);