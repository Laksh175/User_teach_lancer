import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import NextLink from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import HourglassFullIcon from '@mui/icons-material/HourglassFull';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

import {
  internshipViewAll,
  internshipViewByLocation,
  internshipViewByTechnology,
  internshipViewById,
} from '../../../../store/action/compuny/GetData';
import { applyInternship } from '../../../../store/action/user/AddData';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 700, md: 900 },
  maxHeight: '90vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: { xs: 3, sm: 4, md: 5 },
};

const ViewInternship = ({ dispatch, res, searchres, searchtech, resbyid, apply }) => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [filters, setFilters] = useState({
    city: '',
    technology: '',
  });

  useEffect(() => {
    dispatch(internshipViewAll());
  }, [dispatch]);

  // Handle main list
  useEffect(() => {
    if (res?.data?.data?.data) {
      setInternships(res.data.data.data);
      setLoading(false);
    }
  }, [res]);

  // Handle search by city
  useEffect(() => {
    if (filters.city.trim()) {
      dispatch(internshipViewByLocation({ city: filters.city.trim() }));
    }
  }, [filters.city, dispatch]);

  // Handle search by technology
  useEffect(() => {
    if (filters.technology.trim()) {
      dispatch(internshipViewByTechnology({ technology: filters.technology.trim() }));
    }
  }, [filters.technology, dispatch]);

  // Sync search results
  useEffect(() => {
    if (searchres?.data?.data?.data) setInternships(searchres.data.data.data);
  }, [searchres]);

  useEffect(() => {
    if (searchtech?.data?.data?.data) setInternships(searchtech.data.data.data);
  }, [searchtech]);

  // Handle detailed view
  useEffect(() => {
    if (resbyid?.data?.data?.data?.[0]) {
      setSelectedInternship(resbyid.data.data.data[0]);
    }
  }, [resbyid]);

  // Handle apply response
  useEffect(() => {
    const data = apply?.data?.data;
    if (data) {
      if (data.code === 201) {
        toast.success(data.message, { position: 'top-center' });
      } else if (data.code === 401 || data.code === 403) {
        toast.warning(data.message || "Login required", { position: 'top-center' });
        if (data.code === 403) {
          setTimeout(() => {
            window.location.href = '/student-login';
          }, 1800);
        }
      } else {
        toast.error(data.message || 'Something went wrong', { position: 'top-center' });
      }
    }
  }, [apply]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleViewDetails = (id) => {
    dispatch(internshipViewById(id));
    setOpenModal(true);
  };

  const handleApply = (id) => {
    dispatch(applyInternship(id));
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedInternship(null);
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={4500} />

      {/* Hero */}
      <div className="bg-gradient-to-br from-cyan-50 via-blue-50 to-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Explore Internship Opportunities
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Gain real-world experience and kick-start your career
          </p>
        </div>
      </div>

      <section className="py-10 md:py-16 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="city"
                placeholder="Search by city..."
                value={filters.city}
                onChange={handleFilterChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
              />
              <input
                type="text"
                name="technology"
                placeholder="Search by technology / skill..."
                value={filters.technology}
                onChange={handleFilterChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Internship Cards */}
          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow-sm p-6 animate-pulse space-y-4"
                >
                  <div className="h-8 bg-gray-200 rounded w-3/4" />
                  <div className="h-5 bg-gray-200 rounded w-1/2" />
                  <div className="flex gap-3">
                    <div className="h-8 bg-gray-200 rounded w-24" />
                    <div className="h-8 bg-gray-200 rounded w-28" />
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                  <div className="h-10 bg-gray-200 rounded w-32" />
                </div>
              ))}
            </div>
          ) : internships.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {internships.map((intern) => (
                <div
                  key={intern._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                >
                  <div className="p-6 md:p-8">
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-4 flex-1">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-cyan-700 transition-colors">
                            {intern.company_name}
                          </h3>
                          {intern.type === '1' && (
                            <p className="text-gray-600 mt-1 capitalize">{intern.address}</p>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-3">
                          <div className="inline-flex items-center px-4 py-1.5 bg-cyan-100 text-cyan-800 rounded-full text-sm font-medium">
                            {intern.technology}
                          </div>
                          <div className="inline-flex items-center px-4 py-1.5 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                            <HourglassFullIcon className="w-4 h-4 mr-1" />
                            {intern.time === '1' ? 'Part-time' : 'Full-time'}
                          </div>
                          <div className="inline-flex items-center px-4 py-1.5 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                            {intern.stipend}
                            {intern.stipend === 'fixed' && (
                              <span className="ml-1 font-bold">{intern.stipend_salary}</span>
                            )}
                          </div>
                        </div>

                        <div className="text-gray-700">
                          <span className="font-semibold">Vacancy:</span> {intern.vacancy}
                        </div>

                        <p className="text-gray-600 line-clamp-3 min-h-[4.5rem]">
                          {intern.description || 'No description provided.'}
                        </p>

                        {intern.active === 1 ? (
                          <button
                            onClick={() => handleApply(intern._id)}
                            className="mt-4 inline-flex items-center px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-lg transition-colors shadow-sm"
                          >
                            Apply Now
                          </button>
                        ) : (
                          <button
                            disabled
                            className="mt-4 inline-flex items-center px-6 py-3 bg-gray-400 text-white font-medium rounded-lg cursor-not-allowed"
                          >
                            Not Accepting Applications
                          </button>
                        )}
                      </div>

                      {/* Status + More */}
                      <div className="flex flex-col items-end gap-3">
                        {intern.active === 1 ? (
                          <span className="inline-flex px-4 py-1.5 bg-green-100 text-green-800 font-medium rounded-full text-sm">
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex px-4 py-1.5 bg-red-100 text-red-800 font-medium rounded-full text-sm">
                            Inactive
                          </span>
                        )}

                        <button
                          onClick={() => handleViewDetails(intern._id)}
                          className="text-gray-500 hover:text-cyan-600 transition-colors"
                          title="View Details"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                No Internships Found
              </h2>
              <p className="text-gray-600 text-lg">
                Try changing your search filters or check back later for new opportunities.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Detail Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          <div className="relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <CloseIcon fontSize="large" />
            </button>

            {selectedInternship && (
              <div className="space-y-6 pt-4">
                <h2 className="text-3xl font-bold text-gray-900 text-center">
                  {selectedInternship.company_name}
                </h2>

                <hr className="border-gray-200" />

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <span className="font-bold text-gray-800">City: </span>
                      <span className="text-gray-700">{selectedInternship.address || '—'}</span>
                    </div>

                    <div>
                      <span className="font-bold text-gray-800">Technology: </span>
                      <span className="text-gray-700">{selectedInternship.technology}</span>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full">
                        {selectedInternship.stipend}
                        {selectedInternship.stipend === 'fixed' && (
                          <span className="ml-1 font-bold">{selectedInternship.stipend_salary}</span>
                        )}
                      </div>

                      <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full">
                        <HourglassFullIcon className="w-5 h-5 mr-1" />
                        {selectedInternship.time === '1' ? 'Part-time' : 'Full-time'}
                      </div>
                    </div>

                    <div>
                      <span className="font-bold text-gray-800">Vacancy: </span>
                      <span className="text-gray-700">{selectedInternship.vacancy}</span>
                    </div>

                    <div>
                      <span className="font-bold text-gray-800">Duration: </span>
                      <span className="text-gray-700">{selectedInternship.duration || '—'}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {selectedInternship.perks?.length > 0 && (
                      <div>
                        <h3 className="font-bold text-lg text-gray-800 mb-2">Perks</h3>
                        <ul className="space-y-1 text-gray-700">
                          {selectedInternship.perks.map((perk, i) => (
                            <li key={i} className="flex items-start">
                              <RadioButtonUncheckedIcon className="w-5 h-5 text-cyan-600 mr-2 mt-0.5 flex-shrink-0" />
                              {perk}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {selectedInternship.skills?.length > 0 && (
                      <div>
                        <h3 className="font-bold text-lg text-gray-800 mb-2">Required Skills</h3>
                        <ul className="space-y-1 text-gray-700">
                          {selectedInternship.skills.map((skill, i) => (
                            <li key={i} className="flex items-start">
                              <RadioButtonUncheckedIcon className="w-5 h-5 text-cyan-600 mr-2 mt-0.5 flex-shrink-0" />
                              {skill}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="font-bold text-lg text-gray-800 mb-3">Description</h3>
                  <div className="prose text-gray-700 max-h-60 overflow-y-auto pr-2">
                    {selectedInternship.description || 'No description available.'}
                  </div>
                </div>
              </div>
            )}
          </div>
        </Box>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  res: state.internshipViewAll,
  searchres: state.internshipViewByLocation,
  searchtech: state.internshipViewByTechnology,
  resbyid: state.internshipViewById,
  apply: state.applyInternship,
});

export default connect(mapStateToProps)(ViewInternship);