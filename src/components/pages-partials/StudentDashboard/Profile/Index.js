import React, { useEffect, useState } from 'react';
import NextLink from 'next/link';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { fetchUserView } from '../../../../store/action/user/GetData';
import { addUserProfile } from '../../../../store/action/user/AddData';
import { UserProfileRemove } from '../../../../store/action/user/UpdateData';

const ProfileSide = ({ dispatch, res, imageAdd, removeImage }) => {
  const [profile, setProfile] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [showApplies, setShowApplies] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    dispatch(fetchUserView());
  }, [dispatch]);

  useEffect(() => {
    if (res?.data?.data?.data) {
      const userData = res.data.data.data;
      setProfile(userData);
      localStorage.setItem('userId', userData._id);
    }
  }, [res]);

  // Handle profile image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('profile', file);

    dispatch(addUserProfile(formData));
  };

  // Handle profile image remove
  const handleRemoveProfile = () => {
    dispatch(UserProfileRemove());
  };

  // Toast notifications for upload/remove
  useEffect(() => {
    const data = imageAdd?.data?.data;
    if (data?.code === 200) {
      toast.success(data.message || 'Profile photo updated!', {
        position: 'top-center',
      });
      setUploading(false);
      dispatch(fetchUserView()); // Refresh profile
    }
  }, [imageAdd, dispatch]);

  useEffect(() => {
    const data = removeImage?.data?.data;
    if (data?.code === 200) {
      toast.success(data.message || 'Profile photo removed!', {
        position: 'top-center',
      });
      dispatch(fetchUserView()); // Refresh profile
    }
  }, [removeImage, dispatch]);

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-pulse text-gray-500">Loading profile...</div>
      </div>
    );
  }

  return (
    <>
      <ToastContainer position="top-center" autoClose={4000} />

      <aside className="w-full md:w-80 lg:w-96 bg-white border-r border-gray-200 min-h-screen p-6 md:p-8">
        {/* Profile Header */}
        <div className="relative flex flex-col items-center mb-10">
          {/* Avatar with overlay */}
          <div className="relative group">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-cyan-600 shadow-lg">
              {profile.profile ? (
                <img
                  src={profile.profile}
                  alt={`${profile.first_name} ${profile.last_name}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                  No Photo
                </div>
              )}
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="profile-upload"
                  className="cursor-pointer bg-white text-cyan-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-cyan-50 transition-colors flex items-center gap-2"
                >
                  <AddAPhotoIcon fontSize="small" />
                  Change Photo
                </label>
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                  disabled={uploading}
                />

                {profile.profile && (
                  <button
                    onClick={handleRemoveProfile}
                    className="bg-white text-red-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-red-50 transition-colors"
                    disabled={uploading}
                  >
                    Remove Photo
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Name & Email */}
          <div className="mt-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 capitalize">
              {profile.first_name} {profile.last_name}
            </h2>
            <p className="text-gray-600 mt-1">{profile.email}</p>
          </div>

          {/* Edit Profile Button */}
          <NextLink href="/student-dashboard/edit" passHref>
            <button className="mt-6 px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-lg transition-colors shadow-md">
              Edit Profile
            </button>
          </NextLink>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-2">
          <NextLink href="/student-dashboard" passHref>
            <div className="block px-4 py-3 text-lg font-medium text-gray-700 hover:bg-cyan-50 hover:text-cyan-700 rounded-lg transition-colors cursor-pointer">
              Dashboard
            </div>
          </NextLink>

          {/* Applies Dropdown */}
          <div
            onClick={() => setShowApplies(!showApplies)}
            className="flex items-center justify-between px-4 py-3 text-lg font-medium text-gray-700 hover:bg-cyan-50 hover:text-cyan-700 rounded-lg transition-colors cursor-pointer"
          >
            <span>Applies</span>
            {showApplies ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </div>

          {showApplies && (
            <div className="ml-6 space-y-1 mt-1">
              <NextLink href="/student-dashboard/apply-job" passHref>
                <div className="block px-4 py-2.5 text-gray-600 hover:text-cyan-700 hover:bg-cyan-50 rounded-lg transition-colors cursor-pointer">
                  Jobs
                </div>
              </NextLink>
              <NextLink href="/student-dashboard/apply-internship" passHref>
                <div className="block px-4 py-2.5 text-gray-600 hover:text-cyan-700 hover:bg-cyan-50 rounded-lg transition-colors cursor-pointer">
                  Internships
                </div>
              </NextLink>
            </div>
          )}

          <NextLink href="/student-dashboard/career-details" passHref>
            <div className="block px-4 py-3 text-lg font-medium text-gray-700 hover:bg-cyan-50 hover:text-cyan-700 rounded-lg transition-colors cursor-pointer">
              Career Details
            </div>
          </NextLink>

          <NextLink href="/student-dashboard/prectice" passHref>
            <div className="block px-4 py-3 text-lg font-medium text-gray-700 hover:bg-cyan-50 hover:text-cyan-700 rounded-lg transition-colors cursor-pointer">
              Practice Questions
            </div>
          </NextLink>
        </nav>
      </aside>
    </>
  );
};

const mapStateToProps = (state) => ({
  res: state.fetchUserView,
  imageAdd: state.addUserProfile,
  removeImage: state.UserProfileRemove,
});

export default connect(mapStateToProps)(ProfileSide);