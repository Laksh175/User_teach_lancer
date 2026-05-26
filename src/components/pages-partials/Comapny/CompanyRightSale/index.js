import React, { useEffect } from "react";
import AOS from 'aos';
import Link from "next/link";
import 'aos/dist/aos.css';

const CompanyRightSale = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, [])

    const data = [
        { id: "1", img: "/img/Asset 28 1.png", title: "Verified Talents", content: "Before onboarding, each applicant goes through screening assessments..." },
        { id: "2", img: "/img/Asset 36 1.png", title: "Expert Matchmaking", content: "We connect you with the right match of sales talents who fit perfectly..." },
        { id: "3", img: "/img/Asset 35 1.png", title: "Cost Efficiency", content: "Our rigorous screening saves you financial resources by eliminating the need..." },
        { id: "4", img: "/img/Asset 37 1.png", title: "Agile Onboarding", content: "Match with talents immediately to save time and effort, enhancing organization efficiency..." }
    ]

    return (
        <section className="bg-slate-50 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-20" data-aos="fade-down">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                        How TEACHLANCER™ Helps You Find the <span className="text-[#3DC0DF]">Right Sales Talent?</span>
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {data.map((val) => (
                        <div key={val.id} className="group relative flex flex-col items-center" data-aos="fade-up" data-aos-delay={val.id * 100}>
                            {/* Icon with Black Filter */}
                            <div className="z-20 -mb-12 bg-white w-24 h-24 rounded-2xl shadow-lg border border-slate-100 flex items-center justify-center transform group-hover:-translate-y-2 transition-all duration-300">
                                <img 
                                    src={val.img} 
                                    alt={val.title} 
                                    className="w-12 h-12 object-contain filter grayscale brightness-0 transition-all" 
                                />
                            </div>

                            <div className="bg-white pt-16 pb-8 px-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center h-full hover:shadow-xl transition-all">
                                <h3 className="text-xl font-bold text-slate-800 text-center mb-4">{val.title}</h3>
                                <p className="text-center text-slate-500 text-sm leading-relaxed">{val.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CompanyRightSale;