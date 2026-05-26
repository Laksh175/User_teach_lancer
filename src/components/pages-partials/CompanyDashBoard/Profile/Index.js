import React, { useEffect, useState } from 'react';
import NextLink from 'next/link';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

import { fetchCompanyView } from '../../../../store/action/compuny/GetData';
import { addCompanyProfile } from '../../../../store/action/compuny/AddData';
import { CompanyProfileRemove } from '../../../../store/action/compuny/UpdateData';

const ProfileSide = ({ dispatch, res, imageAdd, removeImage }) => {
  const [company, setCompany] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    dispatch(fetchCompanyView());
  }, [dispatch]);

  useEffect(() => {
    if (res?.data?.data?.data) {
      setCompany(res.data.data.data);
    }
  }, [res]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file); // backend expects 'image' field

    dispatch(addCompanyProfile(formData));
  };

  const handleRemovePhoto = () => {
    dispatch(CompanyProfileRemove());
  };

  // Success / error feedback
  useEffect(() => {
    if (imageAdd?.data?.data?.code === 200) {
      toast.success(imageAdd.data.data.message || 'Company logo updated!', {
        position: 'top-center',
      });
      setUploading(false);
      dispatch(fetchCompanyView());
    }
  }, [imageAdd, dispatch]);

  useEffect(() => {
    if (removeImage?.data?.data?.code === 200) {
      toast.success(removeImage.data.data.message || 'Company logo removed!', {
        position: 'top-center',
      });
      dispatch(fetchCompanyView());
    }
  }, [removeImage, dispatch]);

  if (!company) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-pulse text-gray-600">Loading company profile...</div>
      </div>
    );
  }

  return (
    <>
      <ToastContainer position="top-center" autoClose={4000} hideProgressBar />

      <aside className="w-full md:w-80 lg:w-96 bg-white border-r border-gray-200 min-h-screen p-6 md:p-8">
        {/* Company Logo / Avatar */}
        <div className="flex flex-col items-center mb-10 relative">
          <div className="relative group">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-[#3DC0DF] shadow-lg">
              {company.image ? (
                <img
                  src={company.image}
                  alt={company.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-2xl font-medium">
                  No Logo
                </div>
              )}
            </div>

            {/* Hover overlay: change / remove logo */}
            <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
              <label
                htmlFor="company-logo-upload"
                className="cursor-pointer bg-white text-[#3DC0DF] px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm"
              >
                <AddAPhotoIcon fontSize="small" />
                Change Logo
              </label>
              <input
                id="company-logo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
                disabled={uploading}
              />

              {company.image && (
                <button
                  onClick={handleRemovePhoto}
                  disabled={uploading}
                  className="bg-white text-red-600 px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-red-50 transition-colors shadow-sm"
                >
                  Remove Logo
                </button>
              )}
            </div>
          </div>

          {/* Company Name & Contact Person */}
          <div className="mt-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#212A41] uppercase tracking-wide">
              {company.name}
            </h2>
            <p className="text-gray-600 mt-1.5 font-medium">
              {company.your_name || 'Contact Person'}
            </p>
          </div>

          {/* Edit Profile Button */}
          <NextLink href="/company-dashboard/edit" passHref>
            <button className="mt-6 px-10 py-3 bg-[#3DC0DF] hover:bg-cyan-600 text-white font-semibold rounded-xl transition-colors shadow-md">
              Edit Profile
            </button>
          </NextLink>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <NextLink href="/company-dashboard/post-internship" passHref>
            <button className="w-full sm:w-auto px-8 py-3.5 bg-[#212A41] hover:bg-[#3DC0DF] text-white font-semibold rounded-xl transition-colors shadow-md">
              New Internship
            </button>
          </NextLink>

          <NextLink href="/company-dashboard/job-preferences" passHref>
            <button className="w-full sm:w-auto px-8 py-3.5 bg-[#212A41] hover:bg-[#3DC0DF] text-white font-semibold rounded-xl transition-colors shadow-md">
              New Job
            </button>
          </NextLink>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-2">
          {[
            { label: 'Dashboard', href: '/company-dashboard' },
            { label: 'Jobs', href: '/company-dashboard/job-view' },
            { label: 'Internships', href: '/company-dashboard/internship-view' },
            // { label: 'Applied Users', href: '/company-dashboard/all-apply-user' },
          ].map((item) => (
            <NextLink key={item.href} href={item.href} passHref>
              <div className="block px-5 py-3.5 text-lg font-medium text-gray-700 hover:bg-[#3DC0DF]/10 hover:text-[#3DC0DF] rounded-xl transition-colors cursor-pointer">
                {item.label}
              </div>
            </NextLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

const mapStateToProps = (state) => ({
  res: state.fetchCompanyView,
  imageAdd: state.addCompanyProfile,
  removeImage: state.CompanyProfileRemove,
});

export default connect(mapStateToProps)(ProfileSide);