import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  jobPrefrenceView,
  jobViewByLocation,
  jobViewByTechnology,
  jobViewByposition,
} from '../../../../store/action/compuny/GetData';
import { applyJob } from '../../../../store/action/user/AddData';

const ViewJob = ({ dispatch, res, searchres, searchtech, searchposi, apply }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    position: '',
    technology: '',
  });

  useEffect(() => {
    dispatch(jobPrefrenceView());
  }, [dispatch]);

  // Handle initial job list
  useEffect(() => {
    if (res?.data?.data?.data) {
      setJobs(res.data.data.data);
      setLoading(false);
    }
  }, [res]);

  // Handle location search
  useEffect(() => {
    if (searchFilters.location) {
      dispatch(jobViewByLocation({ location: searchFilters.location }));
    }
  }, [searchFilters.location, dispatch]);

  // Handle technology search
  useEffect(() => {
    if (searchFilters.technology) {
      dispatch(jobViewByTechnology({ technology: searchFilters.technology }));
    }
  }, [searchFilters.technology, dispatch]);

  // Handle position search
  useEffect(() => {
    if (searchFilters.position) {
      dispatch(jobViewByposition({ position: searchFilters.position }));
    }
  }, [searchFilters.position, dispatch]);

  // Sync search results to jobs list
  useEffect(() => {
    if (searchres?.data?.data?.data) setJobs(searchres.data.data.data);
  }, [searchres]);

  useEffect(() => {
    if (searchtech?.data?.data?.data) setJobs(searchtech.data.data.data);
  }, [searchtech]);

  useEffect(() => {
    if (searchposi?.data?.data?.data) setJobs(searchposi.data.data.data);
  }, [searchposi]);

  // Handle apply job response
  useEffect(() => {
    const data = apply?.data?.data;
    if (data) {
      if (data.code === 201) {
        toast.success(data.message, { position: 'top-center' });
      } else if (data.code === 401 || data.code === 403) {
        toast.warning(data.message || "You don't have access without login", {
          position: 'top-center',
        });
        if (data.code === 403) {
          setTimeout(() => {
            window.location.href = '/student-login';
          }, 1800);
        }
      } else if (data.code === 500) {
        toast.error(data.message || 'Server error', { position: 'top-center' });
      }
    }
  }, [apply]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setSearchFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApply = (jobId) => {
    dispatch(applyJob(jobId));
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={4000} />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 via-cyan-50 to-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Explore Job Opportunities
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Discover positions that match your skills and preferences
          </p>
        </div>
      </div>

      <section className="py-10 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                name="location"
                placeholder="Search by city / location..."
                value={searchFilters.location}
                onChange={handleFilterChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
              />
              <input
                type="text"
                name="position"
                placeholder="Search by job position..."
                value={searchFilters.position}
                onChange={handleFilterChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
              />
              <input
                type="text"
                name="technology"
                placeholder="Search by technology / skill..."
                value={searchFilters.technology}
                onChange={handleFilterChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Job Listings */}
          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow-sm p-6 animate-pulse space-y-4"
                >
                  <div className="h-8 bg-gray-200 rounded w-3/4" />
                  <div className="h-5 bg-gray-200 rounded w-1/2" />
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                  <div className="h-10 bg-gray-200 rounded w-32" />
                </div>
              ))}
            </div>
          ) : jobs.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                >
                  <div className="p-6 md:p-8">
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-3 flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-cyan-700 transition-colors">
                          {job.company_name}
                        </h3>
                        <p className="text-lg font-medium text-gray-700 capitalize">
                          {job.position}
                        </p>

                        <div className="space-y-2 text-gray-600">
                          <p>
                            Starting Salary:{' '}
                            <span className="font-semibold text-gray-900">
                              {job.salary}
                            </span>
                          </p>
                          <p>
                            Technology:{' '}
                            <span className="font-semibold text-gray-900">
                              {job.technology}
                            </span>
                          </p>
                        </div>

                        <p className="text-gray-600 line-clamp-3 min-h-[4.5rem] mt-4">
                          {job.description || 'No description provided.'}
                        </p>

                        {job.active === 1 ? (
                          <button
                            onClick={() => handleApply(job._id)}
                            className="mt-6 inline-flex items-center px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-lg transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2"
                          >
                            Apply Now
                          </button>
                        ) : (
                          <button
                            disabled
                            className="mt-6 inline-flex items-center px-6 py-3 bg-gray-400 text-white font-medium rounded-lg cursor-not-allowed"
                          >
                            Not Accepting Applications
                          </button>
                        )}
                      </div>

                      {/* Status Badge */}
                      <div className="flex-shrink-0">
                        {job.active === 1 ? (
                          <span className="inline-flex items-center px-4 py-1.5 bg-green-100 text-green-800 font-medium rounded-full text-sm">
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-4 py-1.5 bg-red-100 text-red-800 font-medium rounded-full text-sm">
                            Inactive
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                No Jobs Found
              </h2>
              <p className="text-gray-600 text-lg">
                Try adjusting your search filters or check back later for new opportunities.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

const mapStateToProps = (state) => ({
  res: state.jobPrefrenceView,
  searchres: state.jobViewByLocation,
  searchtech: state.jobViewByTechnology,
  searchposi: state.jobViewByposition,
  apply: state.applyJob,
});

export default connect(mapStateToProps)(ViewJob);