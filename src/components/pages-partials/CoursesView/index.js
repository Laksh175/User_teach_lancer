import React, { useEffect, useState } from 'react';
import { fetchtermWiseView } from '../../../store/action/Comman/getdata';
import { connect } from 'react-redux';
import NextLink from 'next/link';

const LiveSaleProg = ({ dispatch, res }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const term = localStorage.getItem("term");
    if (term) {
      dispatch(fetchtermWiseView({ term }));
    }
  }, [dispatch]);

  useEffect(() => {
    if (res?.data?.data?.data) {
      setCourses(res.data.data.data);
      setLoading(false);
    } else if (!res?.loading && (res?.data === null || res?.error)) {
      setLoading(false);
    }
  }, [res]);

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Live Sales Programs
          </h1>
          <p className="mt-3 text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            Our flagship sales programs teach high-impact skills you didn’t even know you needed.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow h-80 animate-pulse" />
            ))}
          </div>
        ) : courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-200"
              >
                {/* Header with avatar + name + role */}
                <div className="flex items-center gap-4 px-5 pt-5 pb-4 bg-white">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-cyan-400 shadow-sm">
                      <img
                        src={course.teacher_profile || "/img/Rectangle 7.png"}
                        alt={course.teacher_name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">
                      {course.teacher_name?.toUpperCase() || "INSTRUCTOR"}
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 font-medium mt-0.5">
                      {course.role || "Sales Trainer"}
                    </p>
                  </div>
                </div>

                {/* Main content */}
                <div className="px-5 pb-6 pt-2">
                  <div className="flex flex-wrap items-baseline justify-between gap-3 mb-4">
                    <h4 className="text-lg md:text-xl font-semibold text-gray-800">
                      {course.title}
                    </h4>
                    <div className="bg-cyan-100 text-cyan-700 font-bold text-base md:text-lg px-4 py-1.5 rounded-lg whitespace-nowrap">
                      ₹{Number(course.fees)?.toLocaleString() || "—"}
                    </div>
                  </div>

                  <p className="text-cyan-600 text-sm md:text-base font-medium mb-4">
                    Fresh batches every week
                  </p>

                  <hr className="border-gray-200 mb-4" />

                  <p className="text-gray-700 text-sm md:text-base leading-relaxed line-clamp-3 min-h-[4.5rem] mb-6">
                    {course.description || "Learn core concepts and practical skills..."}
                  </p>

                  <div className="text-center">
                    <NextLink
                      href={`/shorterm-course/sortterm-course-detail/${course._id}`}
                      onClick={() => {
                        localStorage.setItem("courseId", course._id);
                        localStorage.setItem("fees", course.fees);
                      }}
                    >
                      <button className="inline-flex items-center justify-center w-full max-w-xs mx-auto px-8 py-3.5 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold text-base rounded-xl transition-colors duration-200 shadow-sm hover:shadow">
                        Learn More →
                      </button>
                    </NextLink>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            <p className="text-2xl md:text-3xl font-semibold">No Courses Available</p>
            <p className="mt-3">New batches are added weekly — check back soon!</p>
          </div>
        )}
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  res: state.fetchtermWiseView,
});

export default connect(mapStateToProps)(LiveSaleProg);