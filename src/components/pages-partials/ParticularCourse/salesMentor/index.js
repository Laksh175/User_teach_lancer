import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchtCourseDetail } from '../../../../store/action/Comman/getdata'

const SalesMentor = ({ dispatch, res }) => {

    const [data, setData] = useState({});
    const [skills, setSkills] = useState([]);
    const [criteria, setCriteria] = useState({});

    useEffect(() => {
        const id = localStorage.getItem('courseId')
        dispatch(fetchtCourseDetail(id))
    }, [])

    useEffect(() => {
        const course = res?.data?.data?.data
        if (course) {
            setCriteria(course.criteria?.[0] || {})
            setSkills(course.skill || [])
            setData(course)
        }
    }, [res])


    return (
        <div className="bg-gray-50">

            {/* HERO SECTION */}
            <div className='max-w-7xl mx-auto px-4 py-12'>
                <div className='grid lg:grid-cols-3 grid-cols-1 gap-10 items-center'>

                    {/* LEFT CONTENT */}
                    <div className='lg:col-span-2 space-y-5'>

                        <div className='flex items-center gap-4'>
                            <img src='/img/mentorlogo.png'
                                className='w-[70px] h-[100px] object-contain'
                            />
                        </div>

                        <h1 className='xl:text-[45px] md:text-[40px] text-[32px] font-bold uppercase leading-tight'>
                            {data.title}
                        </h1>

                        <p className='text-[18px] text-gray-600 leading-relaxed'>
                            {data.description}
                        </p>

                    </div>

                    {/* MENTOR CARD */}
                    <div className='flex justify-center'>
                        <div className='bg-white shadow-lg rounded-xl p-6 text-center w-[260px]'>

                            <img
                                src={data.teacher_profile}
                                className='w-[160px] h-[160px] mx-auto rounded-full object-cover shadow-md'
                            />

                            <p className='text-[22px] font-semibold mt-4 capitalize'>
                                {data.teacher_name}
                            </p>

                            <p className='text-gray-500 text-sm'>
                                Course Mentor
                            </p>

                        </div>
                    </div>

                </div>
            </div>


            {/* SKILLS SECTION */}
            <div className='max-w-7xl mx-auto px-4 py-12'>

                <h1 className='text-center text-[35px] font-semibold mb-10'>
                    What will you Master in the Program?
                </h1>

                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">

                    {skills.map((val, i) => (
                        <div
                            key={i}
                            className='bg-white shadow-md rounded-lg p-5 hover:shadow-xl transition duration-300'
                        >
                            <p className='text-[18px] text-center font-medium'>
                                {val}
                            </p>
                        </div>
                    ))}

                </div>

            </div>


            {/* CRITERIA SECTION */}
            <div className='max-w-7xl mx-auto px-4 pb-16'>

                <div className='bg-white rounded-xl shadow-lg p-10'>

                    <h1 className='text-[35px] font-semibold text-center mb-3'>
                        Minimum Criteria
                    </h1>

                    <p className='text-center text-gray-500 mb-10'>
                        You should meet the following requirements to be eligible for this course.
                    </p>


                    <div className='grid md:grid-cols-3 sm:grid-cols-2 gap-8 capitalize'>

                        <div>
                            <h2 className='text-[18px] font-semibold mb-2'>Qualification</h2>
                            <p className='text-gray-600'>
                                {criteria.qualification} Ready To Take a Job Immediately After Course Finishes
                            </p>
                        </div>

                        <div>
                            <h2 className='text-[18px] font-semibold mb-2'>Age</h2>
                            <p className='text-gray-600'>
                                {criteria.age} Year
                            </p>
                        </div>

                        <div>
                            <h2 className='text-[18px] font-semibold mb-2'>ID</h2>
                            <p className='text-gray-600'>
                                Valid {criteria.id_proof}
                            </p>
                        </div>

                        <div>
                            <h2 className='text-[18px] font-semibold mb-2'>Hardware</h2>
                            <p className='text-gray-600'>
                                {criteria.hardware}
                            </p>
                        </div>

                        <div>
                            <h2 className='text-[18px] font-semibold mb-2'>Communication Skills</h2>
                            <p className='text-gray-600'>
                                {criteria.communication}
                            </p>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}


const mapStateToProps = (state) => ({
    res: state.fetchtCourseDetail
})

export default connect(mapStateToProps)(SalesMentor)