import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchAllVideoView } from '../../../store/action/user/GetData';

const CourseVideos = ({ dispatch, res }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchAllVideoView());
  }, [dispatch]);

  useEffect(() => {
    if (res?.data?.data?.data) {
      setVideos(res.data.data.data);
      setLoading(false);
    } else if (res && !res.loading) {
      setLoading(false);
    }
  }, [res]);

  return (
    <section className="py-12 md:py-16 bg-gray-50 min-h-[60vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
            Course Video Lessons
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Some people dream of success. Others wake up and work for it.
          </p>
        </div>

        {/* Video Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse"
              >
                <div className="aspect-video bg-gray-200" />
                <div className="p-5 space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : videos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {videos.map((video, index) => (
              <div
                key={video._id || index}
                className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                {/* Video Player */}
                <div className="aspect-video bg-black">
                  <video
                    className="w-full h-full object-cover"
                    controls
                    preload="metadata"
                  >
                    <source src={video.video?.[0]?.res} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-cyan-700 transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base line-clamp-3">
                    {video.desc || 'No description available.'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="mx-auto max-w-md">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                No Videos Available
              </h2>
              <p className="text-gray-600 mb-6">
                You need to enroll in the course first to access these video lessons.
              </p>
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center px-6 py-3 bg-cyan-600 text-white font-medium rounded-lg hover:bg-cyan-700 transition-colors"
              >
                ← Back to Courses
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  res: state.fetchAllVideoView,
});

export default connect(mapStateToProps)(CourseVideos);