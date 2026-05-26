import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import NextLink from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import HourglassFullIcon from '@mui/icons-material/HourglassFull';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

import {
  internshipViewByCompany,
  internshipViewById,
} from '../../../../store/action/compuny/GetData';
import { delateInternship } from '../../../../store/action/compuny/deleteData';
import ProfileSide from '../Profile/Index';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 600, md: 900 },
  maxHeight: '90vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: { xs: 3, sm: 4, md: 5 },
};

const deleteModalStyle = {
  ...modalStyle,
  width: { xs: '90%', sm: 400 },
};

const ViewInternship = ({ dispatch, res, resbyid, delete: del }) => {
  const [internships, setInternships] = useState([]);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [internToDelete, setInternToDelete] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    dispatch(internshipViewByCompany());
  }, [dispatch]);

  useEffect(() => {
    if (res?.data?.data?.data) {
      setInternships(res.data.data.data);
      setLoading(false);
    } else if (res && !res.loading) {
      setLoading(false);
    }
  }, [res]);

  useEffect(() => {
    if (resbyid?.data?.data?.data?.[0]) {
      setSelectedInternship(resbyid.data.data.data[0]);
      setDetailLoading(false);
    } else if (resbyid?.data?.data?.data) {
      setSelectedInternship(resbyid.data.data.data);
      setDetailLoading(false);
    }
  }, [resbyid]);

  useEffect(() => {
    const response = del?.data?.data;
    if (response?.code === 200) {
      toast.success(response.message || 'Internship deleted successfully!', {
        position: 'top-center',
      });
      setOpenDeleteModal(false);
      setInternToDelete(null);
      dispatch(internshipViewByCompany()); // refresh list
    } else if (response?.message) {
      toast.error(response.message, { position: 'top-center' });
    }
  }, [del, dispatch]);

  const handleViewDetails = (id) => {
    setDetailLoading(true);
    setSelectedInternship(null);
    dispatch(internshipViewById(id));
    setOpenDetailModal(true);
    setActiveDropdown(null);
  };

  const handleDeleteConfirm = () => {
    if (internToDelete) {
      dispatch(delateInternship(internToDelete));
    }
  };

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const getStatusBadge = (active) => {
    return active === 1 ? (
      <span className="inline-flex px-4 py-1.5 bg-green-100 text-green-800 font-medium rounded-full text-sm border border-green-200">
        Active
      </span>
    ) : (
      <span className="inline-flex px-4 py-1.5 bg-red-100 text-red-800 font-medium rounded-full text-sm border border-red-200">
        Inactive
      </span>
    );
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={4000} hideProgressBar />

      <div className="min-h-screen bg-gray-50">
        <div className="flex flex-col md:flex-row max-w-7xl mx-auto">
          {/* Sidebar */}
          <ProfileSide />

          {/* Main Content */}
          <main className="flex-1 p-6 md:p-8 lg:p-10">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#212A41] to-[#3DC0DF] text-white rounded-2xl shadow-xl p-8 md:p-12 mb-10 text-center">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                All Posted Internships
              </h1>
              <p className="mt-3 text-lg opacity-90">
                Manage and track all your active and inactive internship postings
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
            ) : internships.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {internships.map((intern, index) => (
                  <div
                    key={intern._id}
                    className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 group relative"
                  >
                    <div className="p-6 md:p-8">
                      <div className="flex justify-between items-start gap-4">
                        <div className="space-y-4 flex-1">
                          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#3DC0DF] transition-colors">
                            {intern.company_name}
                          </h3>

                          {intern.type === 1 && (
                            <p className="text-gray-600 capitalize">{intern.city}</p>
                          )}

                          <div className="flex flex-wrap items-center gap-3 pt-2">
                            <span className="inline-flex px-4 py-1.5 bg-cyan-100 text-cyan-800 rounded-full text-sm font-medium">
                              {intern.technology}
                            </span>

                            <span className="inline-flex items-center px-4 py-1.5 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                              {intern.stipend}
                              {intern.stipend === 'fixed' && (
                                <span className="ml-1 font-bold">{intern.stipend_salary}</span>
                              )}
                            </span>

                            <span className="inline-flex items-center px-4 py-1.5 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                              <HourglassFullIcon fontSize="small" className="mr-1" />
                              {intern.time === 1 ? 'Part-time' : 'Full-time'}
                            </span>

                            {getStatusBadge(intern.active)}
                          </div>

                          <div className="text-sm text-gray-600">
                            <span className="font-medium">Vacancy:</span> {intern.vacancy || '—'}
                          </div>

                          {intern.skills?.length > 0 && (
                            <div className="pt-2">
                              <p className="font-medium text-gray-700 mb-1">Required Skills:</p>
                              <div className="flex flex-wrap gap-2">
                                {intern.skills.map((skill, i) => (
                                  <span
                                    key={i}
                                    className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                                  >
                                    <RadioButtonUncheckedIcon fontSize="small" className="mr-1 text-[#3DC0DF]" />
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Actions Dropdown */}
                        <div className="relative">
                          <button
                            onClick={() => toggleDropdown(index)}
                            className="p-2 text-gray-500 hover:text-[#3DC0DF] rounded-full hover:bg-gray-100 transition-colors"
                          >
                            <MoreVertIcon />
                          </button>

                          {activeDropdown === index && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                              <NextLink
                                href={`/company-dashboard/internship-view/internship-edit/${intern._id}`}
                                onClick={() => {
                                  localStorage.setItem('InernshipId', intern._id);
                                  setActiveDropdown(null);
                                }}
                                className="block px-5 py-2.5 text-gray-700 hover:bg-[#3DC0DF]/10 hover:text-[#3DC0DF] transition-colors"
                              >
                                Edit
                              </NextLink>

                              <button
                                onClick={() => {
                                  handleViewDetails(intern._id);
                                  setActiveDropdown(null);
                                }}
                                className="block w-full text-left px-5 py-2.5 text-gray-700 hover:bg-[#3DC0DF]/10 hover:text-[#3DC0DF] transition-colors"
                              >
                                View Details
                              </button>

                              <NextLink
                                href={`/company-dashboard/internship-view/internship-apply/${intern._id}`}
                                onClick={() => {
                                  localStorage.setItem('InernshipId', intern._id);
                                  setActiveDropdown(null);
                                }}
                                className="block px-5 py-2.5 text-gray-700 hover:bg-[#3DC0DF]/10 hover:text-[#3DC0DF] transition-colors"
                              >
                                View Applications
                              </NextLink>

                              <button
                                onClick={() => {
                                  setInternToDelete(intern._id);
                                  setOpenDeleteModal(true);
                                  setActiveDropdown(null);
                                }}
                                className="block w-full text-left px-5 py-2.5 text-red-600 hover:bg-red-50 transition-colors"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
                  No Internships Posted Yet
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Start posting internships to attract talented candidates.
                </p>
                <NextLink href="/company-dashboard/post-internship" passHref>
                  <button className="px-10 py-4 bg-[#3DC0DF] hover:bg-cyan-600 text-white font-semibold rounded-xl transition-colors shadow-md">
                    Post New Internship →
                  </button>
                </NextLink>
              </div>
            )}
          </main>
        </div>

        {/* Internship Detail Modal */}
        <Modal open={openDetailModal} onClose={() => setOpenDetailModal(false)}>
          <Box sx={modalStyle}>
            {detailLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-gray-200 rounded w-48 mx-auto" />
                    <div className="h-4 bg-gray-200 rounded w-64 mx-auto" />
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-56 mx-auto" />
                      <div className="h-4 bg-gray-200 rounded w-56 mx-auto" />
                    </div>
                  </div>
                </div>
              </div>
            ) : selectedInternship ? (
              <div className="relative">
                <button
                  onClick={() => setOpenDetailModal(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                >
                  <CloseIcon fontSize="large" />
                </button>

                <div className="space-y-6 pt-4">
                  <h2 className="text-3xl font-bold text-[#212A41] text-center">
                    {selectedInternship.company_name}
                  </h2>

                  <hr className="border-gray-200" />

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      {/* <div>
                        <span className="font-bold text-gray-800">City: </span>
                        <span className="text-gray-700">{selectedInternship.city || '—'}</span>
                      </div> */}

                      <div>
                        <span className="font-bold text-gray-800">Technology: </span>
                        <span className="text-gray-700">{selectedInternship.technology}</span>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <span className="inline-flex px-4 py-1.5 bg-cyan-100 text-cyan-800 rounded-full text-sm font-medium">
                          {selectedInternship.stipend}
                          {selectedInternship.stipend === 'fixed' && (
                            <span className="ml-1 font-bold">{selectedInternship.stipend_salary}</span>
                          )}
                        </span>

                        <span className="inline-flex items-center px-4 py-1.5 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                          <HourglassFullIcon fontSize="small" className="mr-1" />
                          {selectedInternship.time === 1 ? 'Part-time' : 'Full-time'}
                        </span>

                        {getStatusBadge(selectedInternship.active)}
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

                    <div className="space-y-6">
                      {selectedInternship.perks?.length > 0 && (
                        <div>
                          <h3 className="font-bold text-lg text-gray-800 mb-3">Perks</h3>
                          <ul className="space-y-1.5 text-gray-700">
                            {selectedInternship.perks.map((perk, i) => (
                              <li key={i} className="flex items-start">
                                <RadioButtonUncheckedIcon className="w-5 h-5 text-[#3DC0DF] mr-2 mt-0.5 flex-shrink-0" />
                                {perk}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {selectedInternship.skills?.length > 0 && (
                        <div>
                          <h3 className="font-bold text-lg text-gray-800 mb-3">Required Skills</h3>
                          <ul className="space-y-1.5 text-gray-700">
                            {selectedInternship.skills.map((skill, i) => (
                              <li key={i} className="flex items-start">
                                <RadioButtonUncheckedIcon className="w-5 h-5 text-[#3DC0DF] mr-2 mt-0.5 flex-shrink-0" />
                                {skill}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No internship details available</p>
              </div>
            )}
          </Box>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
          <Box sx={deleteModalStyle}>
            <div className="text-center py-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Are you sure you want to delete this internship?
              </h3>

              <div className="flex justify-center gap-6">
                <button
                  onClick={() => setOpenDeleteModal(false)}
                  className="px-10 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-xl transition-colors"
                >
                  Cancel
                </button>

                <button
                  onClick={handleDeleteConfirm}
                  className="px-10 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition-colors shadow-md"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  res: state.internshipViewByCompany,
  resbyid: state.internshipViewById,
  delete: state.delateInternship,
});

export default connect(mapStateToProps)(ViewInternship);