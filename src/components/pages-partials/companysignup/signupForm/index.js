import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { compunyRagistration } from "../../../../store/action/compuny/AddData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CompanyvalidationSchema } from "../../../validation";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Building2,
  User,
  Globe,
  Mail,
  Phone,
  Lock,
  Briefcase,
} from "lucide-react";

const CompSignUp = ({ dispatch, res }) => {
  const router = useRouter();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const [data, setData] = useState({
    name: "",
    type: "",
    industry_type: "",
    no_of_emp: "",
    your_name: "",
    your_role: "",
    email: "",
    country: "",
    state: "",
    city: "",
    mobile: "",
    wallet: "",
    whats_app: 0,
    password: "",
    confirmPassword: "",
  });

  const formOptions = { resolver: yupResolver(CompanyvalidationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = (formData) => {
    // react-hook-form passes the perfectly validated data right here!

    // If you need to include the whats_app checkbox state since you handled it manually:
    const finalData = {
      ...formData,
      whats_app: data.whats_app,
    };

    dispatch(compunyRagistration(finalData));
  };

  useEffect(() => {
    const response = res.data ? res.data.data : null;
    if (response) {
      if (response.code === 201) {
        toast.success(response.message, { position: "top-center" });
        setTimeout(() => {
          router.push("/company-login");
        }, 1500);
      } else if (response.code === 409) {
        toast.warning(response.message, { position: "top-center" });
      }
    }
  }, [res, router]);

  const handleInput = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setData({ ...data, [name]: checked ? 1 : 0 });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const inputClass = (error) => `
        w-full px-4 py-2.5 rounded-xl border-2 transition-all outline-none bg-white
        ${
          error
            ? "border-red-400 focus:ring-red-50"
            : "border-slate-100 focus:border-[#3DC0DF] focus:ring-4 focus:ring-[#3DC0DF]/10"
        }
    `;

  const labelClass =
    "text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-2 ml-1";

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4">
      <ToastContainer />

      <div className="max-w-4xl mx-auto">
        {/* Header & Logo */}
        <div className="text-center mb-10" data-aos="fade-down">
          <NextLink href="/">
            <img
              src="/img/logo.png"
              alt="Logo"
              className="h-12 mx-auto mb-6 cursor-pointer"
            />
          </NextLink>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Register Your <span className="text-[#3DC0DF]">Company</span>
          </h1>
          <p className="text-slate-500 mt-2">
            Join India's leading teaching-based sales platform
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100"
          data-aos="fade-up"
        >
          {/* SECTION 1: Company Profile */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-6 border-b border-slate-50 pb-2">
              <Building2 size={20} className="text-[#3DC0DF]" />
              <h2 className="text-lg font-bold text-slate-800">
                Company Information
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Company Name*</label>
                <input
                  type="text"
                  {...register("name")}
                  className={inputClass(errors.name)}
                  onChange={handleInput}
                  value={data.name}
                  placeholder="Google Inc"
                />
                <p className="text-xs text-red-500 mt-1">
                  {errors.name?.message}
                </p>
              </div>
              <div>
                <label className={labelClass}>Company Type*</label>
                <select
                  {...register("type")}
                  className={inputClass(errors.type)}
                  onChange={handleInput}
                  value={data.type}
                >
                  <option value="">Choose Type</option>
                  <option value="Private Limited">Private Limited</option>
                  <option value="Public Limited">Public Limited</option>
                  <option value="Micro Companies">Micro Company</option>
                  <option value="Small Companies">Small Company</option>
                </select>
                <p className="text-xs text-red-500 mt-1">
                  {errors.type?.message}
                </p>
              </div>
              <div>
                <label className={labelClass}>Industry*</label>
                <select
                  {...register("industry_type")}
                  className={inputClass(errors.industry_type)}
                  onChange={handleInput}
                  value={data.industry_type}
                >
                  <option value="">Choose Industry</option>
                  <option value="Commercial">Commercial</option>
                  <option value="IT">IT & Tech</option>
                  <option value="SaaS">SaaS</option>
                </select>
                <p className="text-xs text-red-500 mt-1">
                  {errors.industry_type?.message}
                </p>
              </div>
              <div>
                <label className={labelClass}>No. of Employees</label>
                <input
                  type="number"
                  {...register("no_of_emp")}
                  className={inputClass(errors.no_of_emp)}
                  onChange={handleInput}
                  value={data.no_of_emp}
                  placeholder="e.g. 50"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: Representative Info */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-6 border-b border-slate-50 pb-2">
              <Briefcase size={20} className="text-[#3DC0DF]" />
              <h2 className="text-lg font-bold text-slate-800">
                Your Professional Details
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Full Name*</label>
                <input
                  type="text"
                  {...register("your_name")}
                  className={inputClass(errors.your_name)}
                  onChange={handleInput}
                  value={data.your_name}
                  placeholder="John Doe"
                />
                <p className="text-xs text-red-500 mt-1">
                  {errors.your_name?.message}
                </p>
              </div>
              <div>
                <label className={labelClass}>Your Role*</label>
                <select
                  {...register("your_role")}
                  className={inputClass(errors.your_role)}
                  onChange={handleInput}
                  value={data.your_role}
                >
                  <option value="">Choose Role</option>
                  <option value="CEO">CEO</option>
                  <option value="founder">Founder</option>
                  <option value="HR Manager">HR Manager</option>
                </select>
                <p className="text-xs text-red-500 mt-1">
                  {errors.your_role?.message}
                </p>
              </div>
            </div>
          </div>

          {/* SECTION 3: Location & Contact */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-6 border-b border-slate-50 pb-2">
              <Globe size={20} className="text-[#3DC0DF]" />
              <h2 className="text-lg font-bold text-slate-800">
                Contact & Location
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className={labelClass}>Country*</label>
                <input
                  type="text"
                  {...register("country")}
                  className={inputClass(errors.country)}
                  onChange={handleInput}
                  value={data.country}
                  placeholder="India"
                />
              </div>
              <div>
                <label className={labelClass}>State*</label>
                <input
                  type="text"
                  {...register("state")}
                  className={inputClass(errors.state)}
                  onChange={handleInput}
                  value={data.state}
                  placeholder="Maharashtra"
                />
              </div>
              <div>
                <label className={labelClass}>City*</label>
                <input
                  type="text"
                  {...register("city")}
                  className={inputClass(errors.city)}
                  onChange={handleInput}
                  value={data.city}
                  placeholder="Mumbai"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Work Email*</label>
                <input
                  type="email"
                  {...register("email")}
                  className={inputClass(errors.email)}
                  onChange={handleInput}
                  value={data.email}
                  placeholder="hr@company.com"
                />
                <p className="text-xs text-red-500 mt-1">
                  {errors.email?.message}
                </p>
              </div>
              <div>
                <label className={labelClass}>Mobile Number*</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    {...register("mobile")}
                    className={inputClass(errors.mobile)}
                    onChange={handleInput}
                    value={data.mobile}
                    placeholder="9876543210"
                  />
                  <div className="flex items-center gap-2 whitespace-nowrap bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
                    <input
                      type="checkbox"
                      name="whats_app"
                      onChange={handleInput}
                      checked={data.whats_app === 1}
                      className="w-4 h-4 accent-[#3DC0DF]"
                    />
                    <span className="text-xs font-bold text-slate-600">
                      WhatsApp
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <label className={labelClass}>Wallet*</label>
                <input
                  type="text"
                  {...register("wallet")}
                  className={inputClass(errors.wallet)}
                  onChange={handleInput}
                  value={data.wallet}
                  placeholder="Enter wallet address"
                />
                <p className="text-xs text-red-500 mt-1">
                  {errors.wallet?.message}
                </p>
              </div>
            </div>
          </div>

          {/* SECTION 4: Security */}
          <div className="mb-10 bg-slate-50 p-6 rounded-2xl">
            <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-2">
              <Lock size={20} className="text-[#3DC0DF]" />
              <h2 className="text-lg font-bold text-slate-800">Security</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Password*</label>
                <input
                  type="password"
                  {...register("password")}
                  className={inputClass(errors.password)}
                  onChange={handleInput}
                  value={data.password}
                  placeholder="••••••••"
                />
                <p className="text-xs text-red-500 mt-1">
                  {errors.password?.message}
                </p>
              </div>
              <div>
                <label className={labelClass}>Confirm Password*</label>
                <input
                  type="password"
                  {...register("confirmPassword")}
                  className={inputClass(errors.confirmPassword)}
                  onChange={handleInput}
                  value={data.confirmPassword}
                  placeholder="••••••••"
                />
                <p className="text-xs text-red-500 mt-1">
                  {errors.confirmPassword?.message}
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full md:w-auto bg-[#202040] hover:bg-slate-800 text-white font-bold py-4 px-12 rounded-xl shadow-xl transition-all active:scale-95"
            >
              Create Company Account
            </button>
            <div className="mt-6 text-sm text-slate-500 font-medium">
              Already have an account?{" "}
              <NextLink
                href="/company-login"
                className="text-[#3DC0DF] font-bold hover:underline"
              >
                Login Now
              </NextLink>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  res: state.compunyRagistration,
});

export default connect(mapStateToProps)(CompSignUp);
