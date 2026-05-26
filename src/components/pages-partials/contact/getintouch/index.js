import React, { useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';

const GetInTouch = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, [])

    return (
        <section className="relative pt-20 pb-6 overflow-hidden">
            {/* Optional: Subtle background glow to make it pop */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-20 pointer-events-none">
                <div className="w-[500px] h-[300px] bg-[#3DC0DF] rounded-full blur-[120px] mx-auto"></div>
            </div>

            <div className="max-w-4xl mx-auto px-4 text-center">
                {/* 1. Small Badge/Label */}
                <div 
                    data-aos="fade-up" 
                    className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#3DC0DF]/10 border border-[#3DC0DF]/20 mb-6"
                >
                    <span className="flex h-2 w-2 rounded-full bg-[#3DC0DF] animate-pulse"></span>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#1a5d6d]">
                        Contact Our Team
                    </span>
                </div>

                {/* 2. Main Heading */}
                <h1 
                    data-aos="fade-up" 
                    data-aos-delay="100"
                    className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-4"
                >
                    Let’s Start a <span className="text-[#3DC0DF]">Conversation</span>
                </h1>

                {/* 3. Descriptive Subtext */}
                <p 
                    data-aos="fade-up" 
                    data-aos-delay="200"
                    className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed"
                >
                    Have questions about hiring or our academy? We’re here to help you scale your sales team or your career.
                </p>

                {/* 4. Visual Divider Accent */}
                <div 
                    data-aos="zoom-in" 
                    data-aos-delay="300"
                    className="mt-8 flex justify-center items-center gap-2"
                >
                    <div className="h-1 w-12 bg-slate-200 rounded-full"></div>
                    <div className="h-1.5 w-1.5 bg-[#3DC0DF] rounded-full"></div>
                    <div className="h-1 w-12 bg-slate-200 rounded-full"></div>
                </div>
            </div>
        </section>
    )
}

export default GetInTouch