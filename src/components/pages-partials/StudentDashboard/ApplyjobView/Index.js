import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { fetchApplyJobData } from '../../../../store/action/user/GetData';
import Profile from '../Profile/Index';

const StudDashboard = ({ dispatch, res }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchApplyJobData());
  }, [dispatch]);

  useEffect(() => {
    if (res?.data?.data?.data) {
      setApplications(res.data.data.data);
      setLoading(false);
    } else if (res && !res.loading) {
      setLoading(false);
    }
  }, [res]);

  const getStatusBadge = (status) => {
    const statusMap = {
      1: { label: 'Applied', color: 'bg-blue-100 text-blue-800' },
      2: { label: 'In Process', color: 'bg-yellow-100 text-yellow-800' },
      3: { label: 'Accepted', color: 'bg-green-100 text-green-800' },
      4: { label: 'Rejected', color: 'bg-red-100 text-red-800' },
    };

    const info = statusMap[status] || { label: 'Unknown', color: 'bg-gray-100 text-gray-800' };

    return (
      <span
        className={`inline-flex px-4 py-1.5 rounded-full text-sm font-medium ${info.color}`}
      >
        {info.label}
      </span>
    );
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={4000} />

      <div className="min-h-screen bg-gray-50">
        <div className="flex flex-col md:flex-row max-w-7xl mx-auto">
          {/* Sidebar */}
          <Profile />

          {/* Main Content */}
          <main className="flex-1 p-6 md:p-8 lg:p-10">
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white rounded-2xl shadow-lg p-8 md:p-12 mb-10 text-center">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                Your Job Applications
              </h1>
              <p className="mt-3 text-lg md:text-xl opacity-90">
                Track the status of all positions you've applied for
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl shadow-sm p-6 animate-pulse space-y-4"
                  >
                    <div className="h-8 bg-gray-200 rounded w-3/4" />
                    <div className="h-5 bg-gray-200 rounded w-1/2" />
                    <div className="h-6 bg-gray-200 rounded w-32" />
                  </div>
                ))}
              </div>
            ) : applications.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {applications.map((app) => (
                  <div
                    key={app._id}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    <div className="p-6 md:p-8">
                      <div className="flex justify-between items-start gap-4">
                        <div className="space-y-3 flex-1">
                          <h3 className="text-2xl font-bold text-gray-900">
                            {app.company_name}
                          </h3>

                          <p className="text-gray-600 capitalize">
                            {app.company_city || 'Location not specified'}
                          </p>

                          <div className="flex flex-wrap items-center gap-3">
                            <span className="text-lg font-semibold text-gray-800">
                              {app.position}
                            </span>

                            <span
                              className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                                app.types === 1
                                  ? 'bg-cyan-100 text-cyan-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {app.types === 1 ? 'Part Time' : 'Full Time'}
                            </span>

                            {getStatusBadge(app.status)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
                  No Applications Yet
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  You haven't applied to any jobs yet. Start exploring opportunities now!
                </p>
                <a
                  href="/jobs" // ← change to your jobs page route
                  className="inline-flex items-center px-8 py-4 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-xl transition-colors shadow-md"
                >
                  Browse Jobs →
                </a>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  res: state.fetchApplyJobData,
});

export default connect(mapStateToProps)(StudDashboard);