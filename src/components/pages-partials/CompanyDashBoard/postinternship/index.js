import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { internshipPost } from "../../../../store/action/compuny/AddData";
import { internshipValidationSchema } from "../../../validation";
import ProfileSide from "../Profile/Index";

const PostIntern = ({ dispatch, res }) => {
  const [charCount, setCharCount] = useState(0);
  const maxDescription = 500; // adjust as needed

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(internshipValidationSchema),
    defaultValues: {
      type: "",
      time: "",
      vacancy: "",
      start_date: "",
      duration: "",
      description: "",
      technology: "",
      stipend: "",
      stipend_salary: "",
      perks: [],
      skills: "",
      active: "",
    },
  });

  const description = watch("description") || "";
  useEffect(() => {
    setCharCount(description.length);
  }, [description]);

  const onSubmit = (formValues) => {
    // Convert perks array if needed (checkbox returns array)
    const payload = {
      ...formValues,
      perks: Array.isArray(formValues.perks)
        ? formValues.perks
        : [formValues.perks],
    };

    dispatch(internshipPost(payload));
  };

  // Toast success/error
  useEffect(() => {
    const response = res?.data?.data;
    if (response?.code === 201) {
      toast.success(response.message || "Internship posted successfully!", {
        position: "top-center",
      });
      reset(); // clear form
      setTimeout(() => {
        window.location.href = "/company-dashboard/internship-view";
      }, 1800);
    } else if (response?.message) {
      toast.error(response.message, { position: "top-center" });
    }
  }, [res, reset]);

  return (
    <>
      <ToastContainer position="top-center" autoClose={4000} hideProgressBar />

      <div className="min-h-screen bg-gray-50">
        <div className="flex flex-col md:flex-row max-w-7xl mx-auto">
          {/* Sidebar */}
          <ProfileSide />

          {/* Main Form Content */}
          <main className="flex-1 p-6 md:p-8 lg:p-10">
            <div className="bg-gradient-to-r from-[#212A41] to-[#3DC0DF] text-white rounded-2xl shadow-xl p-8 md:p-12 mb-10 text-center">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                Post a New Internship
              </h1>
              <p className="mt-3 text-lg opacity-90">
                Attract top talent by posting your internship opportunity
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-6 md:p-10 lg:p-12">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  {/* Internship Type */}
                  <div>
                    <label className="block text-lg font-semibold text-gray-800 mb-3">
                      Internship Type
                    </label>
                    <div className="flex flex-wrap gap-8">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          value="1"
                          {...register("type")}
                          className="w-5 h-5 text-[#3DC0DF] border-gray-300 focus:ring-[#3DC0DF]"
                        />
                        <span className="text-gray-700 text-lg">
                          Regular (In-office/On-field)
                        </span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          value="2"
                          {...register("type")}
                          className="w-5 h-5 text-[#3DC0DF] border-gray-300 focus:ring-[#3DC0DF]"
                        />
                        <span className="text-gray-700 text-lg">
                          Work from Home
                        </span>
                      </label>
                    </div>
                    {errors.type && (
                      <p className="mt-2 text-red-600 text-sm">
                        {errors.type.message}
                      </p>
                    )}
                  </div>

                  {/* Time Commitment */}
                  <div>
                    <label className="block text-lg font-semibold text-gray-800 mb-3">
                      Time Commitment
                    </label>
                    <div className="flex flex-wrap gap-8">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          value="1"
                          {...register("time")}
                          className="w-5 h-5 text-[#3DC0DF] border-gray-300 focus:ring-[#3DC0DF]"
                        />
                        <span className="text-gray-700 text-lg">Part-time</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          value="2"
                          {...register("time")}
                          className="w-5 h-5 text-[#3DC0DF] border-gray-300 focus:ring-[#3DC0DF]"
                        />
                        <span className="text-gray-700 text-lg">Full-time</span>
                      </label>
                    </div>
                    {errors.time && (
                      <p className="mt-2 text-red-600 text-sm">
                        {errors.time.message}
                      </p>
                    )}
                  </div>

                  {/* Vacancy, Start Date, Duration */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Vacancy *
                      </label>
                      <input
                        type="number"
                        {...register("vacancy")}
                        placeholder="Number of openings"
                        className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3DC0DF] focus:border-[#3DC0DF] bg-gray-50"
                      />
                      {errors.vacancy && (
                        <p className="mt-1 text-red-600 text-sm">
                          {errors.vacancy.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Date *
                      </label>
                      <input
                        type="date"
                        {...register("start_date")}
                        className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3DC0DF] focus:border-[#3DC0DF] bg-gray-50"
                      />
                      {errors.start_date && (
                        <p className="mt-1 text-red-600 text-sm">
                          {errors.start_date.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Duration *
                      </label>
                      <input
                        type="text"
                        {...register("duration")}
                        placeholder="e.g. 6 months"
                        className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3DC0DF] focus:border-[#3DC0DF] bg-gray-50"
                      />
                      {errors.duration && (
                        <p className="mt-1 text-red-600 text-sm">
                          {errors.duration.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Description *
                      </label>
                      <span
                        className={`text-sm ${
                          charCount > maxDescription
                            ? "text-red-600"
                            : "text-gray-500"
                        }`}
                      >
                        {charCount}/{maxDescription}
                      </span>
                    </div>
                    <textarea
                      {...register("description")}
                      placeholder="Describe the intern’s day-to-day responsibilities, expectations, and learning outcomes..."
                      rows={6}
                      className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3DC0DF] focus:border-[#3DC0DF] resize-none bg-gray-50"
                    />
                    {errors.description && (
                      <p className="mt-1 text-red-600 text-sm">
                        {errors.description.message}
                      </p>
                    )}
                  </div>

                  {/* Technology */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Required Technology *
                    </label>
                    <input
                      type="text"
                      {...register("technology")}
                      placeholder="e.g. React, Node.js, Python, Figma..."
                      className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3DC0DF] focus:border-[#3DC0DF] bg-gray-50"
                    />
                    {errors.technology && (
                      <p className="mt-1 text-red-600 text-sm">
                        {errors.technology.message}
                      </p>
                    )}
                  </div>
                  
                  {/* Skills */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Required Skills *
                    </label>
                    <input
                      type="text"
                      {...register("skills")}
                      placeholder="e.g. React, Node.js, Python, Figma..."
                      className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3DC0DF] focus:border-[#3DC0DF] bg-gray-50"
                    />
                    {errors.skills && (
                      <p className="mt-1 text-red-600 text-sm">
                        {errors.skills.message}
                      </p>
                    )}
                  </div>

                  {/* Stipend */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Stipend
                    </label>
                    <div className="flex flex-wrap gap-6">
                      {[
                        "fixed",
                        "negotiable",
                        "performance based",
                        "unpaid",
                      ].map((opt) => (
                        <label
                          key={opt}
                          className="flex items-center gap-3 cursor-pointer"
                        >
                          <input
                            type="radio"
                            value={opt}
                            {...register("stipend")}
                            className="w-5 h-5 text-[#3DC0DF] border-gray-300 focus:ring-[#3DC0DF]"
                          />
                          <span className="text-gray-700 capitalize">
                            {opt}
                          </span>
                        </label>
                      ))}
                    </div>
                    {errors.stipend && (
                      <p className="mt-2 text-red-600 text-sm">
                        {errors.stipend.message}
                      </p>
                    )}

                    {watch("stipend") === "fixed" && (
                      <div className="mt-4 flex items-center gap-3">
                        <span className="text-gray-700 font-medium">₹</span>
                        <input
                          type="number"
                          {...register("stipend_salary")}
                          placeholder="Amount per month"
                          className="w-48 px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3DC0DF] bg-gray-50"
                        />
                        <span className="text-gray-700">/ month</span>
                      </div>
                    )}
                  </div>

                  {/* Perks */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Perks (select all that apply)
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        "Certificate",
                        "Flexible work hours",
                        "Informal dress code",
                        "Letter of recommendation",
                        "5 Days a Week",
                        "Free snacks & beverages",
                      ].map((perk) => (
                        <label
                          key={perk}
                          className="flex items-center gap-3 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            value={perk}
                            {...register("perks")}
                            className="w-5 h-5 text-[#3DC0DF] border-gray-300 rounded focus:ring-[#3DC0DF]"
                          />
                          <span className="text-gray-700">{perk}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Active Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Internship Status
                    </label>
                    <div className="flex gap-8">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          value="1"
                          {...register("active")}
                          className="w-5 h-5 text-[#3DC0DF] border-gray-300 focus:ring-[#3DC0DF]"
                        />
                        <span className="text-gray-700 font-medium">
                          Active
                        </span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          value="2"
                          {...register("active")}
                          className="w-5 h-5 text-[#3DC0DF] border-gray-300 focus:ring-[#3DC0DF]"
                        />
                        <span className="text-gray-700 font-medium">
                          Inactive
                        </span>
                      </label>
                    </div>
                    {errors.active && (
                      <p className="mt-2 text-red-600 text-sm">
                        {errors.active.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="text-center pt-10">
                    <button
                      type="submit"
                      className="px-12 py-4 bg-[#212A41] hover:bg-[#3DC0DF] text-white font-bold text-lg rounded-xl transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-[#3DC0DF] focus:ring-offset-2"
                    >
                      Post Internship
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  res: state.internshipPost,
});

export default connect(mapStateToProps)(PostIntern);
