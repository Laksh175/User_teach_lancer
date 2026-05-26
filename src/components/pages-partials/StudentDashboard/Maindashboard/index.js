import React, { useEffect, useState } from 'react'
import ProfileSide from '../Profile/Index'
import { fetchDashboardDataOfUser } from '../../../../store/action/user/GetData';
import { connect } from 'react-redux';
import { FaHireAHelper, FaDiscourse } from 'react-icons/fa'
import DashBoardTable from '../DashBoardTable';
import InternDashBoardTable from '../InternDashBoardTable';

const MainCompDashBoard = ({ dispatch, res }) => {

    const [course, setCourse] = useState();
    const [hire, setHire] = useState();
    console.log(course, "course")
    // console.log(hire, "hire")

    useEffect(() => {
        dispatch(fetchDashboardDataOfUser())
    }, [])

    useEffect(() => {
        const data = res?.data?.data?.data
        if (data) {
            setCourse(data.coursesData)
            setHire(data.hiredData)
        }
    }, [res]);

    return (
        <>
            <div className='max-w-8xl mx-auto px-6 py-6'>

                <div className='flex gap-8'>

                    {/* SIDEBAR */}
                    <ProfileSide />

                    {/* MAIN CONTENT */}
                    <div className='w-full space-y-8'>

                        {/* DASHBOARD CARDS */}
                        <div className='grid md:grid-cols-2 gap-6'>

                            {/* COURSE CARD */}
                            <div className='flex justify-between items-center p-6 rounded-xl shadow-md bg-white border-l-4 border-[#212A41] hover:shadow-xl transition duration-300'>

                                <div className='space-y-2'>
                                    <h2 className='text-lg font-semibold text-gray-500'>
                                        Your Course
                                    </h2>

                                    {course &&
                                        <p className='text-2xl font-bold text-[#212A41]'>
                                            {course.length > 0 && course.map((item) => item.course_title).join(", ")}
                                        </p>
                                    }
                                </div>

                                <div className='w-14 h-14 flex items-center justify-center rounded-full bg-[#212A41]/10'>
                                    <FaDiscourse className='text-3xl text-[#212A41]' />
                                </div>

                            </div>


                            {/* HIRE CARD */}
                            <div className='flex justify-between items-center p-6 rounded-xl shadow-md bg-white border-l-4 border-[#212A41] hover:shadow-xl transition duration-300'>

                                <div className='space-y-2'>
                                    <h2 className='text-lg font-semibold text-gray-500'>
                                        Hired By
                                    </h2>

                                    {hire &&
                                        <p className='text-xl font-bold text-[#212A41]'>
                                            {hire.length > 0 && hire.map((item) => item?.compnay_name).join(", ")}
                                        </p>
                                    }
                                </div>

                                <div className='w-14 h-14 flex items-center justify-center rounded-full bg-[#212A41]/10'>
                                    <FaHireAHelper className='text-3xl text-[#212A41]' />
                                </div>

                            </div>

                        </div>


                        {/* DASHBOARD TABLE */}
                        <div className='bg-white rounded-xl shadow-md p-6'>
                            <h2 className='text-xl font-semibold text-[#212A41] mb-4'>
                                {/* Course Progress */}
                            </h2>

                            <DashBoardTable />
                        </div>


                        {/* INTERN TABLE */}
                        <div className='bg-white rounded-xl shadow-md p-6'>
                            <h2 className='text-xl font-semibold text-[#212A41] mb-4'>
                                Internship Activity
                            </h2>

                            <InternDashBoardTable />
                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    res: state.fetchDashboardDataOfUser
})

export default connect(mapStateToProps)(MainCompDashBoard)