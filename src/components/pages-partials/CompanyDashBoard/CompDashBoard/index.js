import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchApplyCount } from '../../../../store/action/compuny/GetData';
import ProfileSide from '../Profile/Index';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { MdModelTraining } from 'react-icons/md';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { FaBriefcase } from 'react-icons/fa'; // better icon than FaHireAHelper
import NextLink from 'next/link';

ChartJS.register(ArcElement, Tooltip, Legend);

const MainCompDashBoard = ({ dispatch, res }) => {
  const [stats, setStats] = useState({
    jobCount: 0,
    internshipCount: 0,
    hiredCount: 0,
    jobAppliesCount: 0,
    internshipAppliesCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchApplyCount());
  }, [dispatch]);

  useEffect(() => {
    if (res?.data?.data?.data) {
      setStats(res.data.data.data);
      setLoading(false);
    } else if (res && !res.loading) {
      setLoading(false);
    }
  }, [res]);

  // Chart data with brand colors
  const chartData = {
    labels: ['Jobs Posted', 'Job Applications', 'Internships Posted', 'Internship Applications', 'Hired Candidates'],
    datasets: [
      {
        label: 'Overview',
        data: [
          stats.jobCount,
          stats.jobAppliesCount,
          stats.internshipCount,
          stats.internshipAppliesCount,
          stats.hiredCount,
        ],
        backgroundColor: [
          '#81cadb',     // light cyan
          '#3DC0DF',     // main cyan
          '#2aa8c9',     // darker cyan
          '#1e8aa8',     // deep cyan
          '#212A41',     // navy
        ],
        borderColor: '#ffffff',
        borderWidth: 2,
        hoverOffset: 20,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: { size: 14, weight: 'medium' },
          padding: 20,
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: '#212A41',
        titleFont: { size: 14 },
        bodyFont: { size: 13 },
        padding: 12,
        cornerRadius: 8,
      },
    },
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={4000} hideProgressBar />

      <div className="min-h-screen bg-gray-50">
        <div className="flex flex-col md:flex-row max-w-7xl mx-auto">
          {/* Sidebar */}
          <ProfileSide />

          {/* Main Dashboard Content */}
          <main className="flex-1 p-6 md:p-8 lg:p-10">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {/* Jobs Posted */}
              <div className="bg-white rounded-2xl shadow-md border-t-4 border-[#212A41] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                <div className="p-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-600 mb-1">Jobs Posted</h3>
                    {loading ? (
                      <div className="h-10 bg-gray-200 rounded w-16 animate-pulse" />
                    ) : (
                      <p className="text-4xl font-bold text-[#212A41]">
                        {stats.jobCount || 0}
                      </p>
                    )}
                  </div>
                  <div className="text-[#3DC0DF] opacity-90">
                    <WorkOutlineIcon style={{ fontSize: 56 }} />
                  </div>
                </div>
              </div>

              {/* Internships Posted */}
              <div className="bg-white rounded-2xl shadow-md border-t-4 border-[#212A41] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                <div className="p-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-600 mb-1">Internships Posted</h3>
                    {loading ? (
                      <div className="h-10 bg-gray-200 rounded w-16 animate-pulse" />
                    ) : (
                      <p className="text-4xl font-bold text-[#212A41]">
                        {stats.internshipCount || 0}
                      </p>
                    )}
                  </div>
                  <div className="text-[#3DC0DF] opacity-90">
                    <MdModelTraining style={{ fontSize: 56 }} />
                  </div>
                </div>
              </div>

              {/* Total Hired */}
              <div className="bg-white rounded-2xl shadow-md border-t-4 border-[#212A41] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                <div className="p-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-600 mb-1">Total Hired</h3>
                    {loading ? (
                      <div className="h-10 bg-gray-200 rounded w-16 animate-pulse" />
                    ) : (
                      <p className="text-4xl font-bold text-[#212A41]">
                        {stats.hiredCount || 0}
                      </p>
                    )}
                  </div>
                  <div className="text-[#3DC0DF] opacity-90">
                    <FaBriefcase style={{ fontSize: 56 }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Pie Chart Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-6 md:p-8 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-[#212A41] text-center">
                  Application Overview
                </h2>
              </div>
              <div className="p-6 md:p-10" style={{ height: '400px' }}>
                {loading ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="animate-pulse text-gray-500">Loading chart...</div>
                  </div>
                ) : (
                  <Pie data={chartData} options={chartOptions} />
                )}
              </div>
            </div>

            {/* Empty State */}
            {!loading && stats.jobCount === 0 && stats.internshipCount === 0 && stats.hiredCount === 0 && (
              <div className="mt-12 bg-white rounded-2xl shadow-lg p-12 text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  No Activity Yet
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Start posting jobs or internships to see stats here.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <NextLink href="/company-dashboard/post-internship" passHref>
                    <button className="px-8 py-3.5 bg-[#3DC0DF] hover:bg-cyan-600 text-white font-semibold rounded-xl transition-colors shadow-md">
                      Post Internship
                    </button>
                  </NextLink>
                  <NextLink href="/company-dashboard/job-preferences" passHref>
                    <button className="px-8 py-3.5 bg-[#212A41] hover:bg-gray-800 text-white font-semibold rounded-xl transition-colors shadow-md">
                      Post Job
                    </button>
                  </NextLink>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

const chartData = {
  labels: ['Jobs Posted', 'Job Applications', 'Internships Posted', 'Internship Applications', 'Hired Candidates'],
  datasets: [
    {
      label: 'Overview',
      data: [], // filled dynamically
      backgroundColor: [
        '#81cadb',     // light cyan
        '#3DC0DF',     // main cyan
        '#2aa8c9',     // darker cyan
        '#1e8aa8',     // deep cyan
        '#212A41',     // navy
      ],
      borderColor: '#ffffff',
      borderWidth: 2,
      hoverOffset: 20,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        font: { size: 14, weight: 'medium' },
        padding: 20,
        usePointStyle: true,
      },
    },
    tooltip: {
      backgroundColor: '#212A41',
      titleFont: { size: 14 },
      bodyFont: { size: 13 },
      padding: 12,
      cornerRadius: 8,
    },
  },
};

const mapStateToProps = (state) => ({
  res: state.fetchApplyCount,
});

export default connect(mapStateToProps)(MainCompDashBoard);