import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

import Profile from '../../Profile/Index';
import {
  addCareerDetails,
  careerDetailUpadte,
} from '../../../../../store/action/user/AddData';
import { fetchCareerDtailById } from '../../../../../store/action/user/GetData';

const MainCertifications = ({ dispatch, res, careerdetail, updateres }) => {
  const [activeTab, setActiveTab] = useState('company'); // 'company' or 'project'
  const [formData, setFormData] = useState({
    company_name: '',
    company_bio: '',
    com_start_date: '',
    com_end_date: '',
    position: '',
    your_role: '',
    project_name: '',
    project_description: '',
    pro_start_date: '',
    pro_end_date: '',
    member: '',
  });

  const [charCount, setCharCount] = useState(0);
  const maxProjectDesc = 150;

  useEffect(() => {
    const userId = Cookies.get('userId');
    if (userId) {
      dispatch(fetchCareerDtailById(userId));
    }
  }, [dispatch]);

  useEffect(() => {
    if (careerdetail?.data?.data?.data?.[0]) {
      const career = careerdetail.data.data.data[0];
      setFormData(career);
      setCharCount(career.project_description?.length || 0);
    }
  }, [careerdetail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'project_description') {
      setCharCount(value.length);
    }
  };

  const handleSubmitCompany = (e) => {
    e.preventDefault();
    dispatch(addCareerDetails(formData));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(careerDetailUpadte(formData));
  };

  // Toast feedback
  useEffect(() => {
    const data = res?.data?.data || updateres?.data?.data;
    if (data?.code === 201 || data?.code === 200) {
      toast.success(data.message || 'Career details saved successfully!', {
        position: 'top-center',
      });
      dispatch(fetchCareerDtailById(Cookies.get('userId')));
    } else if (data?.message) {
      toast.error(data.message, { position: 'top-center' });
    }
  }, [res, updateres, dispatch]);

  return (
    <>
      <ToastContainer position="top-center" autoClose={4000} />

      <div className="min-h-screen bg-gray-50">
        <div className="flex flex-col md:flex-row max-w-7xl mx-auto">
          {/* Sidebar */}
          <Profile />

          {/* Main Content */}
          <main className="flex-1 p-6 md:p-8 lg:p-10">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              <div className="p-6 md:p-10">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8">
                  Career Details
                </h1>

                {/* Tabs */}
                <div className="flex justify-center gap-4 mb-10">
                  <button
                    onClick={() => setActiveTab('company')}
                    className={`px-8 py-3 font-semibold rounded-xl transition-all ${
                      activeTab === 'company'
                        ? 'bg-[#212A41] text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Company Experience
                  </button>

                  <button
                    onClick={() => setActiveTab('project')}
                    className={`px-8 py-3 font-semibold rounded-xl transition-all ${
                      activeTab === 'project'
                        ? 'bg-[#212A41] text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Project Experience
                  </button>
                </div>

                {/* Form */}
                <form className="space-y-8">
                  {activeTab === 'company' ? (
                    <>
                      {/* Company Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Company Name
                        </label>
                        <input
                          type="text"
                          name="company_name"
                          value={formData.company_name || ''}
                          onChange={handleChange}
                          placeholder="Enter company name"
                          className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none bg-gray-50"
                        />
                      </div>

                      {/* Company Bio */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Company Bio
                        </label>
                        <textarea
                          name="company_bio"
                          value={formData.company_bio || ''}
                          onChange={handleChange}
                          rows={4}
                          placeholder="Brief description of the company..."
                          className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none resize-none bg-gray-50"
                        />
                      </div>

                      {/* Dates */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Start Date
                          </label>
                          <input
                            type="date"
                            name="com_start_date"
                            value={formData.com_start_date || ''}
                            onChange={handleChange}
                            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-gray-50"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            End Date
                          </label>
                          <input
                            type="date"
                            name="com_end_date"
                            value={formData.com_end_date || ''}
                            onChange={handleChange}
                            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-gray-50"
                          />
                        </div>
                      </div>

                      {/* Position & Role */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Position
                          </label>
                          <input
                            type="text"
                            name="position"
                            value={formData.position || ''}
                            onChange={handleChange}
                            placeholder="Your job title / position"
                            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-gray-50"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Your Role
                          </label>
                          <input
                            type="text"
                            name="your_role"
                            value={formData.your_role || ''}
                            onChange={handleChange}
                            placeholder="Key responsibilities / achievements"
                            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-gray-50"
                          />
                        </div>
                      </div>

                      {/* Next Button */}
                      <div className="text-center pt-8">
                        <button
                          type="button"
                          onClick={() => setActiveTab('project')}
                          className="px-10 py-4 bg-[#212A41] hover:bg-cyan-600 text-white font-semibold rounded-xl transition-colors shadow-md"
                        >
                          Next: Add Project Experience →
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Project Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Project Name
                        </label>
                        <input
                          type="text"
                          name="project_name"
                          value={formData.project_name || ''}
                          onChange={handleChange}
                          placeholder="Name of the project"
                          className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-gray-50"
                        />
                      </div>

                      {/* Project Description */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Project Description (max 150 words)
                          </label>
                          <span
                            className={`text-sm ${
                              charCount > maxProjectDesc ? 'text-red-600' : 'text-gray-500'
                            }`}
                          >
                            {charCount}/150
                          </span>
                        </div>
                        <textarea
                          name="project_description"
                          value={formData.project_description || ''}
                          onChange={handleChange}
                          maxLength={150 * 6} // rough word limit
                          rows={6}
                          placeholder="Describe your project, role, technologies, outcomes..."
                          className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 resize-none bg-gray-50"
                        />
                      </div>

                      {/* Project Dates */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Start Date
                          </label>
                          <input
                            type="date"
                            name="pro_start_date"
                            value={formData.pro_start_date || ''}
                            onChange={handleChange}
                            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 bg-gray-50"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            End Date
                          </label>
                          <input
                            type="date"
                            name="pro_end_date"
                            value={formData.pro_end_date || ''}
                            onChange={handleChange}
                            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 bg-gray-50"
                          />
                        </div>
                      </div>

                      {/* Team Members */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Team Members / Collaborators
                        </label>
                        <input
                          type="text"
                          name="member"
                          value={formData.member || ''}
                          onChange={handleChange}
                          placeholder="List team members (comma separated)"
                          className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 bg-gray-50"
                        />
                      </div>

                      {/* Save/Update Button */}
                      <div className="text-center pt-10">
                        {formData.company_name ? (
                          <button
                            type="button"
                            onClick={handleUpdate}
                            className="px-12 py-4 bg-[#212A41] hover:bg-cyan-600 text-white font-semibold rounded-xl transition-colors shadow-lg"
                          >
                            Update Career Details
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={handleSubmitCompany}
                            className="px-12 py-4 bg-[#212A41] hover:bg-cyan-600 text-white font-semibold rounded-xl transition-colors shadow-lg"
                          >
                            Save Career Details
                          </button>
                        )}
                      </div>
                    </>
                  )}
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
  res: state.addCareerDetails,
  careerdetail: state.fetchCareerDtailById,
  updateres: state.careerDetailUpadte,
});

export default connect(mapStateToProps)(MainCertifications);