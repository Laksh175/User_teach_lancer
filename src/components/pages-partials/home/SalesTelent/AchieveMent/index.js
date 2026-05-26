import React, { useEffect, useState, useRef } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import CountUp from 'react-countup';

const AchieveMents = ({ job, salary, companies, verijob, title }) => {
    const [inView, setInView] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });

        // Native Intersection Observer (Replacing the library)
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.unobserve(entry.target); // Stop observing once visible
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Helper to extract numbers from strings (e.g., "500+" -> 500)
    const parseNumber = (str) => {
        if (!str) return 0;
        const num = parseInt(str.toString().replace(/[^0-9]/g, ''));
        return isNaN(num) ? 0 : num;
    };

    // Helper to get suffix (e.g., "500+" -> "+")
    const getSuffix = (str) => {
        if (!str) return "";
        return str.toString().replace(/[0-9]/g, '');
    };

    const stats = [
        { value: job, label: "Sales Jobs" },
        { value: salary, label: "Average Salary" },
        { value: companies, label: "Companies Onboarded" },
        { value: verijob, label: title || "Verified Talent" },
    ];

    return (
        <section className="py-12 bg-white" ref={sectionRef}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div 
                    className="bg-slate-50 rounded-[2.5rem] border border-slate-100 shadow-sm px-8 py-10 md:py-16"
                    data-aos="fade-up"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 lg:gap-y-0 relative">
                        {stats.map((item, index) => (
                            <div 
                                key={index} 
                                className={`flex flex-col items-center justify-center text-center px-4 
                                    ${index !== stats.length - 1 ? 'lg:border-r border-slate-200' : ''}`}
                            >
                                <div className="flex items-baseline justify-center">
                                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                                        {inView ? (
                                            <CountUp 
                                                start={0} 
                                                end={parseNumber(item.value)} 
                                                duration={2.5} 
                                                separator=","
                                            />
                                        ) : "0"}
                                    </h2>
                                    <span className="text-2xl md:text-3xl font-bold text-[#3DC0DF] ml-1">
                                        {getSuffix(item.value)}
                                    </span>
                                </div>
                                <p className="mt-3 text-sm md:text-base font-semibold text-slate-500 uppercase tracking-widest">
                                    {item.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AchieveMents;