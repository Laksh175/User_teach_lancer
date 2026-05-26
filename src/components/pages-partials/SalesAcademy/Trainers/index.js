import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { fetchTainerData } from '../../../../store/action/user/GetData';

const PER_PAGE = 8;

const Trainers = ({ dispatch, res }) => {
  const [trainers, setTrainers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    dispatch(fetchTainerData());
  }, [dispatch]);

  useEffect(() => {
    if (res?.data?.data?.data) {
      setTrainers(res.data.data.data);
      console.log("Trainers loaded:", res.data.data.data);
    }
  }, [res]);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * PER_PAGE;
  const currentTrainers = trainers.slice(offset, offset + PER_PAGE);

  const pageCount = Math.ceil(trainers.length / PER_PAGE);

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Meet Our Expert Trainers
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Passionate professionals dedicated to transforming your fitness journey
          </p>
        </div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {currentTrainers.map((trainer, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Image with gradient overlay */}
              <div className="relative">
                <img
                  src={trainer.profile}
                  alt={`${trainer.first_name} ${trainer.last_name}`}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 uppercase tracking-wide">
                  {trainer.first_name} {trainer.last_name}
                </h3>

                <p className="mt-1 text-indigo-600 font-medium">
                  {trainer.position}
                </p>

                <div className="mt-4 inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                  {trainer.experience} Experience
                </div>

                {/* Optional: social icons / view more button */}
                {/* <div className="mt-6 flex justify-center space-x-4 opacity-70 group-hover:opacity-100 transition-opacity">
                  <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.229.229 2.695.072 7.053.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.157 4.358 2.623 6.824 6.981 6.981C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.358-.157 6.824-2.623 6.981-6.981.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.667-.072-4.947-.157-4.358-2.623-6.824-6.981-6.981C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 11-2.881 0 1.44 1.44 0 012.881 0z" />
                    </svg>
                  </a>
                </div> */}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {pageCount > 1 && (
          <div className="mt-12 flex justify-center">
            <ReactPaginate
              previousLabel="← Previous"
              nextLabel="Next →"
              pageCount={pageCount}
              onPageChange={handlePageClick}
              containerClassName="flex items-center space-x-2"
              previousClassName="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition"
              nextClassName="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition"
              pageClassName="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition"
              activeClassName="!bg-indigo-600 !text-white !border-indigo-600 hover:!bg-indigo-700"
              disabledClassName="opacity-50 cursor-not-allowed"
              breakLabel="..."
              breakClassName="px-4 py-2"
            />
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  res: state.fetchTainerData,
});

export default connect(mapStateToProps)(Trainers);