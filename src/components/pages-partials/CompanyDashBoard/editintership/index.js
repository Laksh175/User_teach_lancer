import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import NextLink from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { internshipPost } from '../../../../store/action/compuny/AddData';
import { internshipViewById } from '../../../../store/action/compuny/GetData';
import { CompanyIternshipPostUpdate } from '../../../../store/action/compuny/UpdateData';
import ProfileSide from '../Profile/Index';

const EditInternship = ({ dispatch, res, updateres }) => {
  const [data, setData] = useState({
    type: "",
    vacancy: "",
    time: "",
    start_date: "",
    duration: "",
    description: "",
    technology: "",
    stipend: "",
    stipend_salary: "",
    perks: [],
    skills: "",
    active: ""
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === "start_date") {
      var date = new Date().getDate();
      var month = new Date().getMonth();
      var year = new Date().getFullYear();
      var fulldate = year + "-" + month + "-" + date;
      const d1 = new Date(fulldate);
      const d2 = new Date(value);
      if (d2.getMonth() > d1.getMonth()) {
        setData({ ...data, [name]: value });
      } else {
        // You can show toast here if you want
      }
    }
    setData({ ...data, [name]: value });

    if (name === "perks") {
      if (e.target.checked) {
        setData({ ...data, [name]: [...data.perks, value] });
      } else {
        setData({ ...data, [name]: [...data.perks].filter((val) => val !== value) });
      }
    }
  };

  const postIntanship = () => {
    const id = localStorage.getItem('InernshipId');
    dispatch(CompanyIternshipPostUpdate(data, id));
  };

  useEffect(() => {
    const id = localStorage.getItem('InernshipId');
    dispatch(internshipViewById(id));
  }, []);

  useEffect(() => {
    const fetchedData = res?.data?.data?.data;
    fetchedData && setData(fetchedData);
  }, [res]);

  useEffect(() => {
    const response = updateres?.data?.data;
    if (response && response.code === 200) {
      toast.success(response.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      setTimeout(() => {
        window.location = "/company-dashboard/internship-view";
      }, 2000);
    }
  }, [updateres]);

  return (
    <>
      <ToastContainer position="top-center" autoClose={4000} hideProgressBar />

      <div className="min-h-screen bg-gray-50">
        <div className="flex flex-col md:flex-row max-w-7xl mx-auto">
          {/* Sidebar */}
          <ProfileSide />

          {/* Main Form Content */}
          <main className="flex-1 p-6 md:p-8 lg:p-10">
            {/* Gradient Header */}
            <div className="bg-gradient-to-r from-[#212A41] to-[#3DC0DF] text-white rounded-2xl shadow-xl p-8 md:p-12 mb-10 text-center">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                Update Internship Posting
              </h1>
              <p className="mt-3 text-lg opacity-90">
                Modify details and republish your internship opportunity
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="p-6 md:p-10 lg:p-12">
                <form className="space-y-8">
                  {/* Internship Type */}
                  <div>
                    <label className="block text-lg font-semibold text-gray-800 mb-3">
                      Internship Type
                    </label>
                    <div className="flex flex-wrap gap-12">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="type"
                          value="1"
                          checked={data.type === 1}
                          onChange={handleInput}
                          className="w-6 h-6 text-[#3DC0DF] border-gray-300 focus:ring-[#3DC0DF]"
                        />
                        <span className="text-gray-700 text-lg">Regular (In-office/On-field)</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="type"
                          value="2"
                          checked={data.type === 2}
                          onChange={handleInput}
                          className="w-6 h-6 text-[#3DC0DF] border-gray-300 focus:ring-[#3DC0DF]"
                        />
                        <span className="text-gray-700 text-lg">Work from Home</span>
                      </label>
                    </div>
                  </div>

                  {/* Time Commitment */}
                  <div>
                    <label className="block text-lg font-semibold text-gray-800 mb-3">
                      Time Commitment
                    </label>
                    <div className="flex flex-wrap gap-12">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="time"
                          value="1"
                          checked={data.time === 1}
                          onChange={handleInput}
                          className="w-6 h-6 text-[#3DC0DF] border-gray-300 focus:ring-[#3DC0DF]"
                        />
                        <span className="text-gray-700 text-lg">Part-time</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="time"
                          value="2"
                          checked={data.time === 2}
                          onChange={handleInput}
                          className="w-6 h-6 text-[#3DC0DF] border-gray-300 focus:ring-[#3DC0DF]"
                        />
                        <span className="text-gray-700 text-lg">Full-time</span>
                      </label>
                    </div>
                  </div>

                  {/* Vacancy, Start Date, Duration */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Number of Openings
                      </label>
                      <input
                        type="number"
                        name="vacancy"
                        value={data.vacancy || ''}
                        onChange={handleInput}
                        placeholder="e.g. 5"
                        min="1"
                        className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3DC0DF] focus:border-[#3DC0DF] bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Date
                      </label>
                      <input
                        type="date"
                        name="start_date"
                        value={data.start_date?.slice(0, 10) || ''}
                        onChange={handleInput}
                        className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3DC0DF] focus:border-[#3DC0DF] bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Duration
                      </label>
                      <input
                        type="text"
                        name="duration"
                        value={data.duration || ''}
                        onChange={handleInput}
                        placeholder="e.g. 6 months"
                        className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3DC0DF] focus:border-[#3DC0DF] bg-gray-50"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={data.description || ''}
                      onChange={handleInput}
                      placeholder="Selected Intern’s Day-to-Day Responsibility Include..."
                      rows={8}
                      className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3DC0DF] focus:border-[#3DC0DF] resize-none bg-gray-50"
                    />
                  </div>

                  {/* Technology */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Required Technology
                    </label>
                    <input
                      type="text"
                      name="technology"
                      value={data.technology || ''}
                      onChange={handleInput}
                      placeholder="e.g. React, Python, Figma..."
                      className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3DC0DF] focus:border-[#3DC0DF] bg-gray-50"
                    />
                  </div>

                  {/* Stipend */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Stipend
                    </label>
                    <div className="flex flex-wrap gap-8">
                      {['fixed', 'negotiable', 'performance based', 'unpaid'].map((option) => (
                        <label key={option} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="radio"
                            name="stipend"
                            value={option}
                            checked={data.stipend === option}
                            onChange={handleInput}
                            className="w-5 h-5 text-[#3DC0DF] border-gray-300 focus:ring-[#3DC0DF]"
                          />
                          <span className="text-gray-700 capitalize">{option}</span>
                        </label>
                      ))}
                    </div>

                    {data.stipend === 'fixed' && (
                      <div className="mt-5 flex items-center gap-4">
                        <span className="text-gray-700 font-medium text-lg">₹</span>
                        <input
                          type="number"
                          name="stipend_salary"
                          value={data.stipend_salary || ''}
                          onChange={handleInput}
                          placeholder="e.g. 10000"
                          className="w-48 px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3DC0DF] bg-gray-50"
                        />
                        <span className="text-gray-700 font-medium">/ month</span>
                      </div>
                    )}
                  </div>

                  {/* Perks */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Perks (select all that apply)
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        'Certificate',
                        'Flexible work hours',
                        'Informal dress code',
                        'Letter of recommendation',
                        '5 Days a Week',
                        'Free snacks & beverages',
                      ].map((perk) => (
                        <label key={perk} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            name="perks"
                            value={perk}
                            checked={data.perks.includes(perk)}
                            onChange={handleInput}
                            className="w-5 h-5 text-[#3DC0DF] border-gray-300 rounded focus:ring-[#3DC0DF]"
                          />
                          <span className="text-gray-700">{perk}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Skills Required
                    </label>
                    <input
                      type="text"
                      name="skills"
                      value={data.skills || ''}
                      onChange={handleInput}
                      placeholder="e.g. Java, React, Communication..."
                      className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3DC0DF] focus:border-[#3DC0DF] bg-gray-50"
                    />
                  </div>

                  {/* Active Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Internship Status
                    </label>
                    <div className="flex gap-10">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="active"
                          value="1"
                          checked={data.active === 1}
                          onChange={handleInput}
                          className="w-6 h-6 text-[#3DC0DF] border-gray-300 focus:ring-[#3DC0DF]"
                        />
                        <span className="text-gray-700 font-medium">Active</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="active"
                          value="2"
                          checked={data.active === 2}
                          onChange={handleInput}
                          className="w-6 h-6 text-[#3DC0DF] border-gray-300 focus:ring-[#3DC0DF]"
                        />
                        <span className="text-gray-700 font-medium">Inactive</span>
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="text-center pt-12 pb-4">
                    <button
                      type="button"
                      onClick={postIntanship}
                      className="px-12 py-4 bg-[#212A41] hover:bg-[#3DC0DF] text-white font-bold text-lg rounded-xl transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-[#3DC0DF] focus:ring-offset-2"
                    >
                      Update Internship
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
  res: state.internshipViewById,
  updateres: state.CompanyIternshipPostUpdate,
});

export default connect(mapStateToProps)(EditInternship);