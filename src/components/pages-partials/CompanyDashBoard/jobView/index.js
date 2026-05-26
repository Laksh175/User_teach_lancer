import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import NextLink from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

import {
  jobPrefrenceViewByCompany,
  jobPrefrenceViewById,
} from "../../../../store/action/compuny/GetData";
import { delatejobs } from "../../../../store/action/compuny/deleteData";
import ProfileSide from "../Profile/Index";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 600, md: 800 },
  maxHeight: "90vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: { xs: 3, sm: 4, md: 5 },
};

const deleteModalStyle = {
  ...modalStyle,
  width: { xs: "90%", sm: 400 },
};

const ViewJob = ({ dispatch, res, resdata, delete: del }) => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    dispatch(jobPrefrenceViewByCompany());
  }, [dispatch]);

  useEffect(() => {
    if (res?.data?.data?.data) {
      setJobs(res.data.data.data);
      setLoading(false);
    } else if (res && !res.loading) {
      setLoading(false);
    }
  }, [res]);

  useEffect(() => {
    if (resdata?.data?.data?.data?.[0]) {
      setSelectedJob(resdata.data.data.data[0]);
    }
  }, [resdata]);

  useEffect(() => {
    const response = del?.data?.data;
    if (response?.code === 200) {
      toast.success(response.message || "Job deleted successfully!", {
        position: "top-center",
      });
      setOpenDeleteModal(false);
      setJobToDelete(null);
      dispatch(jobPrefrenceViewByCompany()); // refresh list
    } else if (response?.message) {
      toast.error(response.message, { position: "top-center" });
    }
  }, [del, dispatch]);

  // const handleViewDetails = (id) => {
  //   dispatch(jobPrefrenceViewById(id));
  //   setOpenDetailModal(true);
  //   setActiveDropdown(null);
  // };
  const handleViewDetails = (jobData) => {
    setSelectedJob(jobData); // Set the data immediately
    setOpenDetailModal(true);
    setActiveDropdown(null);
  };

  const handleDeleteConfirm = () => {
    if (jobToDelete) {
      dispatch(delatejobs(jobToDelete));
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
                All Posted Jobs
              </h1>
              <p className="mt-3 text-lg opacity-90">
                Manage and track all your active and inactive job postings
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
            ) : jobs.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {jobs.map((job, index) => (
                  <div
                    key={job._id}
                    className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 group relative"
                  >
                    <div className="p-6 md:p-8">
                      <div className="flex justify-between items-start gap-4">
                        <div className="space-y-3 flex-1">
                          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#3DC0DF] transition-colors">
                            {job.company_name}
                          </h3>

                          <p className="text-lg font-medium text-gray-700 capitalize">
                            {job.position}
                          </p>

                          <div className="flex flex-wrap items-center gap-3 pt-2">
                            <span className="inline-flex px-4 py-1.5 bg-cyan-100 text-cyan-800 rounded-full text-sm font-medium">
                              {job.type === 1 ? "In-Office" : "Remote"}
                            </span>

                            <span className="inline-flex items-center px-4 py-1.5 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                              <CurrencyRupeeIcon
                                fontSize="small"
                                className="mr-1"
                              />
                              {job.salary}
                            </span>

                            {getStatusBadge(job.active)}
                          </div>

                          <p className="text-gray-600 line-clamp-3 min-h-[4.5rem] mt-3">
                            {job.description || "No description provided."}
                          </p>

                          <div className="text-sm text-gray-600 mt-2">
                            <span className="font-medium">Vacancy:</span>{" "}
                            {job.vacancy || "—"}
                          </div>
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
                                href={`/company-dashboard/job-view/job-update/${job._id}`}
                                onClick={() => {
                                  localStorage.setItem("jobId", job._id);
                                  setActiveDropdown(null);
                                }}
                                className="block px-5 py-2.5 text-gray-700 hover:bg-[#3DC0DF]/10 hover:text-[#3DC0DF] transition-colors"
                              >
                                Edit
                              </NextLink>

                              {/* <button
                                onClick={() => {
                                  handleViewDetails(job._id);
                                  setActiveDropdown(null);
                                }}
                                className="block w-full text-left px-5 py-2.5 text-gray-700 hover:bg-[#3DC0DF]/10 hover:text-[#3DC0DF] transition-colors"
                              >
                                View Details
                              </button> */}
                              <button
                                onClick={() => {
                                  handleViewDetails(job); // Pass the whole job object here!
                                }}
                                className="block w-full text-left px-5 py-2.5 text-gray-700 hover:bg-[#3DC0DF]/10 hover:text-[#3DC0DF] transition-colors"
                              >
                                View Details
                              </button>

                              <NextLink
                                href={`/company-dashboard/job-view/job-apply/${job._id}`}
                                onClick={() => {
                                  localStorage.setItem("jobId", job._id);
                                  setActiveDropdown(null);
                                }}
                                className="block px-5 py-2.5 text-gray-700 hover:bg-[#3DC0DF]/10 hover:text-[#3DC0DF] transition-colors"
                              >
                                View Applications
                              </NextLink>

                              <button
                                onClick={() => {
                                  setJobToDelete(job._id);
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
                  No Jobs Posted Yet
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Start posting jobs to attract top talent.
                </p>
                <NextLink href="/company-dashboard/job-preferences" passHref>
                  <button className="px-10 py-4 bg-[#3DC0DF] hover:bg-cyan-600 text-white font-semibold rounded-xl transition-colors shadow-md">
                    Post a New Job →
                  </button>
                </NextLink>
              </div>
            )}
          </main>
        </div>

        {/* Job Detail Modal */}
        <Modal open={openDetailModal} onClose={() => setOpenDetailModal(false)}>
          <Box sx={modalStyle}>
            {selectedJob && (
              <div className="relative">
                <button
                  onClick={() => setOpenDetailModal(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                >
                  <CloseIcon fontSize="large" />
                </button>

                <div className="space-y-6 pt-4">
                  <h2 className="text-3xl font-bold text-[#212A41] text-center">
                    {selectedJob.company_name}
                  </h2>

                  <hr className="border-gray-200" />

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <span className="font-bold text-gray-800">
                          Location:{" "}
                        </span>
                        <span className="text-gray-700">
                          {selectedJob.location || "—"}
                        </span>
                      </div>

                      <div>
                        <span className="font-bold text-gray-800">
                          Position:{" "}
                        </span>
                        <span className="text-gray-700">
                          {selectedJob.position}
                        </span>
                      </div>

                      <div>
                        <span className="font-bold text-gray-800">
                          Technology:{" "}
                        </span>
                        <span className="text-gray-700">
                          {selectedJob.technology}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <span className="inline-flex px-4 py-1.5 bg-cyan-100 text-cyan-800 rounded-full text-sm font-medium">
                          {selectedJob.type === 1 ? "In-Office" : "Remote"}
                        </span>

                        <span className="inline-flex items-center px-4 py-1.5 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                          <CurrencyRupeeIcon
                            fontSize="small"
                            className="mr-1"
                          />
                          {selectedJob.salary}
                        </span>

                        {getStatusBadge(selectedJob.active)}
                      </div>

                      <div>
                        <span className="font-bold text-gray-800">
                          Vacancy:{" "}
                        </span>
                        <span className="text-gray-700">
                          {selectedJob.vacancy}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-lg text-gray-800 mb-3">
                        Description
                      </h3>
                      <div className="prose text-gray-700 max-h-60 overflow-y-auto pr-2">
                        {selectedJob.description || "No description provided."}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Box>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
          <Box sx={deleteModalStyle}>
            <div className="text-center py-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Are you sure you want to delete this job?
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
  res: state.jobPrefrenceViewByCompany,
  resdata: state.jobPrefrenceViewById,
  delete: state.delatejobs,
});

export default connect(mapStateToProps)(ViewJob);
