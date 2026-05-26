import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import ProfileSide from '../Profile/Index'
import { fetchAllapplyList } from '../../../../store/action/compuny/GetData'
import { internviewLinkGenrate, hiredUser, hireUserjob } from "../../../../store/action/compuny/AddData"
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const UserApply = ({ dispatch, res, hire }) => {

    const [applydata, setApplydata] = useState([]);

    useEffect(() => {
        const id = localStorage.getItem('jobId')
        dispatch(fetchAllapplyList(id))
    }, [])

    useEffect(() => {
        const data = res?.data?.data?.data
        if (data) setApplydata(data)
    }, [res])

    useEffect(() => {
        const data = hire?.data?.data
        if (data?.code === 200) {
            toast.success(data.message, {
                position: toast.POSITION.TOP_CENTER,
            });

            const id = localStorage.getItem('jobId')
            dispatch(fetchAllapplyList(id))
        }
    }, [hire])

    const genrateLinkForInterview = (id) => {
        dispatch(internviewLinkGenrate(id))
        const idd = localStorage.getItem('jobId')
        dispatch(fetchAllapplyList(idd))
    }

    const hirde = (id, data) => {
        dispatch(hiredUser(id, data))
        dispatch(hireUserjob(id))
    }

    return (
        <>
            <ToastContainer />

            <div className='max-w-8xl mx-auto px-6 py-6'>

                <div className='flex gap-8'>

                    <ProfileSide />

                    <div className='w-full'>

                        {/* HEADER */}
                        <div className='bg-white shadow-md rounded-xl p-6 mb-6'>
                            <h1 className='text-2xl font-bold text-[#212A41]'>
                                Applied Candidates
                            </h1>
                            <p className='text-gray-500 text-sm'>
                                Manage candidates who applied for this job
                            </p>
                        </div>


                        {/* CANDIDATE CARDS */}
                        <div className='grid lg:grid-cols-2 gap-6'>

                            {applydata?.map((val, index) => (

                                <div
                                    key={index}
                                    className='bg-white rounded-xl shadow-md p-5 flex justify-between hover:shadow-lg transition duration-300'
                                >

                                    {/* LEFT SIDE */}
                                    <div className='flex gap-4'>

                                        {/* PROFILE IMAGE */}
                                        <img
                                            src={val.profile}
                                            alt=""
                                            className='w-16 h-16 rounded-full object-cover border'
                                        />

                                        {/* USER INFO */}
                                        <div>

                                            <div className='flex items-center gap-3'>

                                                <h2 className='text-lg font-semibold capitalize text-[#212A41]'>
                                                    {val.first_name}
                                                </h2>

                                                {val.types == 1 ? (
                                                    <span className='text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded'>
                                                        Part Time
                                                    </span>
                                                ) : (
                                                    <span className='text-xs bg-green-100 text-green-700 px-2 py-1 rounded'>
                                                        Full Time
                                                    </span>
                                                )}

                                            </div>

                                            <p className='text-sm text-gray-600'>
                                                {val.mobile}
                                            </p>

                                            <p className='text-sm text-gray-500'>
                                                {val.email}
                                            </p>

                                            {/* STATUS BUTTON */}
                                            <div className='mt-3'>

                                                {val.hired_status == 1 &&
                                                    <span className='px-3 py-1 text-xs bg-gray-200 rounded'>
                                                        Applied
                                                    </span>
                                                }

                                                {val.hired_status == 2 &&
                                                    <span className='px-3 py-1 text-xs bg-blue-200 text-blue-700 rounded'>
                                                        In Process
                                                    </span>
                                                }

                                                {val.hired_status == 3 &&
                                                    <span className='px-3 py-1 text-xs bg-green-200 text-green-700 rounded'>
                                                        Hired
                                                    </span>
                                                }

                                                {val.hired_status == 4 &&
                                                    <span className='px-3 py-1 text-xs bg-red-200 text-red-700 rounded'>
                                                        Rejected
                                                    </span>
                                                }

                                            </div>

                                        </div>

                                    </div>


                                    {/* ACTION MENU */}
                                    <div className='relative group'>

                                        <button>
                                            <MoreVertIcon />
                                        </button>

                                        <div className='absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition'>

                                            <Link
                                                href="https://meet.google.com"
                                                target="_blank"
                                                className='block px-4 py-2 hover:bg-gray-100'
                                                onClick={() => genrateLinkForInterview(val.applied_id)}
                                            >
                                                Process Interview
                                            </Link>

                                            <button
                                                onClick={() => hirde(val.applied_id, 3)}
                                                className='block w-full text-left px-4 py-2 hover:bg-gray-100'
                                            >
                                                Hire Candidate
                                            </button>

                                            <button
                                                onClick={() => hirde(val.applied_id, 4)}
                                                className='block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500'
                                            >
                                                Reject Candidate
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    res: state.fetchAllapplyList,
    hire: state.hiredUser
})

export default connect(mapStateToProps)(UserApply)