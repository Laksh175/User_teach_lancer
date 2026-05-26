import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { jobPrefrenceViewById } from '../../../../store/action/compuny/GetData'
import { CompanyJobPostUpdate } from '../../../../store/action/compuny/UpdateData'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProfileSide from '../Profile/Index'

const UpdateJob = ({ dispatch, res, updateres }) => {

    const [data, setData] = useState({
        type: "",
        position: "",
        description: "",
        technology: "",
        salary: "",
        active: "",
        vacancy: ""
    });

    const handleInput = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const Jobpost = () => {
        const id = localStorage.getItem('jobId')
        dispatch(CompanyJobPostUpdate(data, id))
    }

    useEffect(() => {
        const id = localStorage.getItem('jobId')
        dispatch(jobPrefrenceViewById(id))
    }, [])

    useEffect(() => {
        const data = res?.data?.data?.data
        if (data) setData(data)
    }, [res])

    useEffect(() => {
        const data = updateres?.data?.data
        if (data?.code === 200) {
            toast.success(data.message, {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    }, [updateres])

    return (
        <>
            <ToastContainer />

            <div className='max-w-8xl mx-auto px-6 py-6'>

                <div className='flex gap-8'>

                    <ProfileSide />

                    <div className='w-full flex justify-center'>

                        {/* FORM CARD */}
                        <div className='bg-white shadow-xl rounded-xl w-[650px] p-8'>

                            <h1 className='text-[32px] font-bold text-center text-[#202040] mb-8'>
                                Update Job Post
                            </h1>

                            {/* INTERNSHIP TYPE */}
                            <div className='mb-6'>
                                <label className='font-semibold text-[16px]'>Types of Job</label>

                                <div className='flex gap-10 mt-3'>

                                    <label className='flex items-center gap-3 cursor-pointer'>
                                        <input
                                            type="radio"
                                            name="type"
                                            value="1"
                                            checked={data.type == '1'}
                                            onChange={handleInput}
                                            className='w-5 h-5'
                                        />
                                        In-office
                                    </label>

                                    <label className='flex items-center gap-3 cursor-pointer'>
                                        <input
                                            type="radio"
                                            name="type"
                                            value="2"
                                            checked={data.type == '2'}
                                            onChange={handleInput}
                                            className='w-5 h-5'
                                        />
                                        Remote
                                    </label>

                                </div>
                            </div>

                            {/* POSITION */}
                            <div className='mb-6'>
                                <label className='font-semibold'>Position</label>
                                <input
                                    type="text"
                                    name="position"
                                    value={data.position}
                                    placeholder="Enter Position"
                                    onChange={handleInput}
                                    className='w-full mt-2 px-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#202040]'
                                />
                            </div>

                            {/* DESCRIPTION */}
                            <div className='mb-6'>
                                <label className='font-semibold'>Description</label>
                                <textarea
                                    name="description"
                                    value={data.description}
                                    placeholder="Enter Job Description"
                                    onChange={handleInput}
                                    rows="3"
                                    className='w-full mt-2 px-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#202040]'
                                />
                            </div>

                            {/* TECHNOLOGY */}
                            <div className='mb-6'>
                                <label className='font-semibold'>Technology</label>
                                <input
                                    type="text"
                                    name="technology"
                                    value={data.technology}
                                    placeholder="React, Node, Python..."
                                    onChange={handleInput}
                                    className='w-full mt-2 px-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#202040]'
                                />
                            </div>

                            {/* SALARY & VACANCY */}
                            <div className='grid grid-cols-2 gap-6 mb-6'>

                                <div>
                                    <label className='font-semibold'>Salary</label>
                                    <input
                                        type="text"
                                        name="salary"
                                        value={data.salary}
                                        placeholder="₹ Amount"
                                        onChange={handleInput}
                                        className='w-full mt-2 px-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#202040]'
                                    />
                                </div>

                                <div>
                                    <label className='font-semibold'>Vacancy</label>
                                    <input
                                        type="text"
                                        name="vacancy"
                                        value={data.vacancy}
                                        placeholder="Number of positions"
                                        onChange={handleInput}
                                        className='w-full mt-2 px-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#202040]'
                                    />
                                </div>

                            </div>

                            {/* ACTIVE STATUS */}
                            <div className='mb-8'>
                                <label className='font-semibold'>Active Status</label>

                                <div className='flex gap-10 mt-3'>

                                    <label className='flex items-center gap-3 cursor-pointer'>
                                        <input
                                            type="radio"
                                            name="active"
                                            value="1"
                                            checked={data.active == '1'}
                                            onChange={handleInput}
                                            className='w-5 h-5'
                                        />
                                        Active
                                    </label>

                                    <label className='flex items-center gap-3 cursor-pointer'>
                                        <input
                                            type="radio"
                                            name="active"
                                            value="0"
                                            checked={data.active == '0'}
                                            onChange={handleInput}
                                            className='w-5 h-5'
                                        />
                                        Not Active
                                    </label>

                                </div>
                            </div>

                            {/* BUTTON */}
                            <div className='text-center'>
                                <button
                                    onClick={Jobpost}
                                    className='bg-[#202040] text-white px-8 py-2 rounded-lg font-semibold hover:bg-[#3DC0DF] hover:text-[#202040] transition'
                                >
                                    Update Job
                                </button>
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    res: state.jobPrefrenceViewById,
    updateres: state.CompanyJobPostUpdate
})

export default connect(mapStateToProps)(UpdateJob)