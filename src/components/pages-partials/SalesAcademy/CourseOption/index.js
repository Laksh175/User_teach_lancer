import React, { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import NextLink from 'next/link';

const CourseOption = () => {
  useEffect(() => {
    AOS.init({
      once: true,     // animate only once
      duration: 1200,
    });
  }, []);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Choose Your Learning Path
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Flexible options designed to fit your goals, schedule, and career aspirations.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Short Term Card */}
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100"
          >
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-cyan-500 to-teal-500 px-8 py-10 flex items-center justify-between">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Short Term
                <br />
                Courses
              </h2>
              <div className="w-20 h-20 md:w-24 md:h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-inner">
                <img
                  src="/img/stopwatch 1.png"
                  alt="Stopwatch icon"
                  className="w-14 h-14 md:w-16 md:h-16 object-contain"
                />
              </div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-10">
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                Jump-start your skills with focused, intensive programs led by top industry professionals. 
                Learn at your own pace and accelerate your career — perfect when time is limited.
              </p>

              <div className="text-right">
                <NextLink
                  href="/shorterm-course/1"
                  onClick={() => localStorage.setItem("term", "1")}
                >
                  <button className="inline-flex items-center px-7 py-4 bg-cyan-600 text-white font-semibold rounded-xl hover:bg-cyan-700 transition-colors shadow-md hover:shadow-lg text-base group">
                    View Details
                    <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                  </button>
                </NextLink>
              </div>
            </div>
          </div>

          {/* Long Term Card */}
          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100"
          >
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-indigo-500 to-blue-600 px-8 py-10 flex items-center justify-between">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Long Term
                <br />
                Courses
              </h2>
              <div className="w-20 h-20 md:w-24 md:h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-inner">
                <img
                  src="/img/businessman 1.png"
                  alt="Businessman icon"
                  className="w-14 h-14 md:w-16 md:h-16 object-contain"
                />
              </div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-10">
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                Build deep expertise and become truly job-ready with comprehensive, structured programs. 
                Flexible pacing, expert guidance, and real-world projects — ideal for career changers or serious upskillers.
              </p>

              <div className="text-right">
                <NextLink
                  href="/shorterm-course/2"
                  onClick={() => localStorage.setItem("term", "2")}
                >
                  <button className="inline-flex items-center px-7 py-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg text-base group">
                    View Details
                    <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                  </button>
                </NextLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseOption;