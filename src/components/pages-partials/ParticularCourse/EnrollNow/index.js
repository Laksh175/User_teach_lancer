import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsFillClipboard2CheckFill } from 'react-icons/bs';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { addEnroll, addPayment } from '../../../../store/action/user/AddData';
import {
  fetchTimeLecture,
  fetchPaymentDetailsById,
} from '../../../../store/action/user/GetData';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 480 },
  maxHeight: '90vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: { xs: 3, sm: 4 },
};

const EnrollNow = ({ dispatch, res, adderoll, paymentData, paybyID }) => {
  const router = useRouter();
  const { index: courseSlug } = router.query;

  const userId = Cookies.get('userId');
  const token = Cookies.get('token');

  const [schedule, setSchedule] = useState([]);
  const [paymentForm, setPaymentForm] = useState({
    username: '',
    email: '',
    description: '',
    cardNumber: '',
    cvc: '',
    exMonth: '',
    exYear: '',
  });

  const [fee, setFee] = useState('');
  const [enrollData, setEnrollData] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [alreadyEnrolledCourses, setAlreadyEnrolledCourses] = useState([]);
  const [isCheckingEnrollment, setIsCheckingEnrollment] = useState(true);

  // Load fee from localStorage
  useEffect(() => {
    const storedFee = localStorage.getItem('fees');
    if (storedFee) setFee(storedFee);
  }, []);

  // Fetch user's payment/enrollment history
  useEffect(() => {
    if (userId && token) {
      dispatch(fetchPaymentDetailsById());
    }
  }, [dispatch, userId, token]);

  // Safely process enrollment history
  useEffect(() => {
    setIsCheckingEnrollment(true);

    if (!paybyID?.data?.data || !Array.isArray(paybyID.data.data)) {
      setAlreadyEnrolledCourses([]);
      setIsCheckingEnrollment(false);
      return;
    }

    const payments = paybyID.data.data;

    const enrolledIds = payments
      .filter((p) => p && typeof p === 'object' && p.course_id)
      .map((p) => p.course_id);

    setAlreadyEnrolledCourses(enrolledIds);
    setIsCheckingEnrollment(false);
  }, [paybyID]);

  // Fetch lecture schedule
  useEffect(() => {
    const courseId = localStorage.getItem('courseId');
    if (courseId) {
      dispatch(fetchTimeLecture(courseId));
    }
  }, [dispatch]);

  useEffect(() => {
    if (res?.data?.data?.data) {
      setSchedule(res.data.data.data || []);
    }
  }, [res]);

  // Handle form input changes with formatting
  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    let formatted = value;

    if (name === 'cardNumber') {
      formatted = value
        .replace(/\D/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim()
        .slice(0, 19);
    } else if (name === 'exMonth' || name === 'exYear') {
      formatted = value.replace(/\D/g, '').slice(0, 2);
    } else if (name === 'cvc') {
      formatted = value.replace(/\D/g, '').slice(0, 4);
    }

    setPaymentForm((prev) => ({ ...prev, [name]: formatted }));
  };

  // Handle enroll button click
  const handleEnrollClick = (e, courseId, code) => {
    e.preventDefault();

    if (!token) {
      toast.warning('Please login to enroll', { position: 'top-center' });
      router.push('/student-login');
      return;
    }

    if (alreadyEnrolledCourses.includes(courseId)) {
      toast.info('You are already enrolled in this course', {
        position: 'top-center',
      });
      return;
    }

    setEnrollData({ course_id: courseId, code, userId });
    setOpenModal(true);
  };

  // Submit payment & enrollment
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    if (!paymentForm.username || !paymentForm.email || !paymentForm.cardNumber) {
      toast.error('Please fill all required payment fields', {
        position: 'top-center',
      });
      return;
    }

    try {
      await dispatch(
        addPayment(
          {
            ...paymentForm,
            amount: fee,
          },
          enrollData
        )
      );

      await dispatch(addEnroll(enrollData));

      toast.success('Enrollment & payment processed successfully!', {
        position: 'top-center',
      });

      setOpenModal(false);
      // Optional: refresh enrollment status
      dispatch(fetchPaymentDetailsById());
    } catch (err) {
      toast.error('Something went wrong. Please try again.', {
        position: 'top-center',
      });
    }
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={4500} />

      <section className="py-10 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">
            Enroll Now
          </h1>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 md:p-8">
              {/* Desktop Table Header */}
              <div className="hidden md:grid md:grid-cols-12 gap-4 pb-4 border-b font-semibold text-gray-700 text-lg">
                <div className="md:col-span-3">Dates</div>
                <div className="md:col-span-3">Time</div>
                <div className="md:col-span-4">Course</div>
                <div className="md:col-span-2 text-center">Action</div>
              </div>

              {isCheckingEnrollment ? (
                <div className="py-12 text-center text-gray-600">
                  Checking your enrollment status...
                </div>
              ) : schedule.length > 0 ? (
                schedule.map((slot) => {
                  const isEnrolled = alreadyEnrolledCourses.includes(slot.course_id);
                  const isSoldOut = slot.slot <= 0;

                  return (
                    <React.Fragment key={slot._id || slot.code}>
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 py-5 border-b last:border-b-0 items-center hover:bg-gray-50 transition-colors">
                        {/* Dates */}
                        <div className="md:col-span-3">
                          <p className="font-medium">
                            {slot.start_date} — {slot.end_date}
                          </p>
                          <p className="text-sm text-gray-600 capitalize">
                            {slot.day?.[0] || '—'} to {slot.day?.[1] || '—'}
                          </p>
                        </div>

                        {/* Time */}
                        <div className="md:col-span-3">
                          <p className="font-medium">
                            {slot.start_time} PM — {slot.end_time} PM
                          </p>
                          <p className="text-sm text-gray-600 capitalize">
                            {slot.timezone || '—'}
                          </p>
                        </div>

                        {/* Course Name */}
                        <div className="md:col-span-4">
                          <p className="font-medium capitalize">
                            {slot.course_name || '—'}
                          </p>
                        </div>

                        {/* Action */}
                        <div className="md:col-span-2 text-center md:text-right mt-3 md:mt-0">
                          {isSoldOut ? (
                            <button
                              disabled
                              className="px-6 py-2.5 bg-gray-400 text-white rounded-lg font-medium cursor-not-allowed"
                            >
                              Sold Out
                            </button>
                          ) : isEnrolled ? (
                            <div className="inline-flex items-center gap-2 text-green-600 font-medium">
                              <BsFillClipboard2CheckFill size={28} />
                              <span>Enrolled</span>
                            </div>
                          ) : (
                            <button
                              onClick={(e) =>
                                handleEnrollClick(e, slot.course_id, slot.code)
                              }
                              className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium transition-colors shadow-sm"
                            >
                              Enroll Now
                            </button>
                          )}
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })
              ) : (
                <div className="py-16 text-center text-gray-500 text-lg">
                  No upcoming batches available at the moment.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Payment Modal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={modalStyle}>
          <Typography
            variant="h6"
            component="h2"
            className="text-xl font-bold text-center mb-6 uppercase tracking-wide text-gray-800"
          >
            Payment Details
          </Typography>

          <form onSubmit={handlePaymentSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cardholder Name *
              </label>
              <input
                type="text"
                name="username"
                value={paymentForm.username}
                onChange={handlePaymentChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={paymentForm.email}
                onChange={handlePaymentChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Number *
              </label>
              <input
                type="text"
                name="cardNumber"
                value={paymentForm.cardNumber}
                onChange={handlePaymentChange}
                maxLength={19}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none font-mono transition-all"
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Month
                </label>
                <input
                  type="text"
                  name="exMonth"
                  value={paymentForm.exMonth}
                  onChange={handlePaymentChange}
                  maxLength={2}
                  placeholder="MM"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Year
                </label>
                <input
                  type="text"
                  name="exYear"
                  value={paymentForm.exYear}
                  onChange={handlePaymentChange}
                  maxLength={2}
                  placeholder="YY"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVV *
                </label>
                <input
                  type="text"
                  name="cvc"
                  value={paymentForm.cvc}
                  onChange={handlePaymentChange}
                  maxLength={4}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
                  placeholder="123"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount (₹)
              </label>
              <input
                type="text"
                value={`₹${Number(fee || 0).toLocaleString()}`}
                readOnly
                className="w-full px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-lg font-medium text-gray-800 cursor-not-allowed"
              />
            </div>

            <div className="pt-6">
              <button
                type="submit"
                className="w-full py-3.5 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-xl transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2"
              >
                Complete Payment
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  res: state.fetchTimeLecture,
  adderoll: state.addEnroll,
  paymentData: state.addPayment,
  paybyID: state.fetchPaymentDetailsById,
});

export default connect(mapStateToProps)(EnrollNow);