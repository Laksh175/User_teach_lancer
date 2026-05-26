import React, { useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';

const FixPart = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, [])

    const stats = [
        { id: 1, img: "/img/Asset 32 1.png", value: "500+", label: "Sales Talents" },
        { id: 2, img: "/img/Asset 30 1.png", value: "100+", label: "Sales Skills" },
        { id: 3, img: "/img/Asset 28 1.png", value: "100%", label: "Verified Talents" },
        { id: 4, img: "/img/Asset 38 1.png", value: "25+", label: "Companies Onboarded" },
    ];

    const partners = [
        "/img/par1.png", "/img/chai.png", "/img/Group 19.png", 
        "/img/skill.png", "/img/logic.png", "/img/doller.png", "/img/symb 1.png"
    ];

    return (
        <div className='bg-[#1A2235] py-24 overflow-hidden'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 '>
                
                {/* 1. Header Section */}
                <div className='text-center mb-16' data-aos="fade-up">
                    <h2 className='text-[#3DC0DF] font-bold tracking-widest uppercase text-xs mb-3'>By the numbers</h2>
                    <h1 className='text-3xl md:text-4xl font-extrabold text-white'>
                        Hire Top and Verified <span className='text-[#3DC0DF]'>Sales Talent</span>
                    </h1>
                </div>

                {/* 2. Stats Grid */}
                <div className='grid grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto'>
                    {stats.map((stat, index) => (
                        <div 
                            key={stat.id}
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                            className='relative group bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl hover:border-[#3DC0DF]/50 transition-all duration-300'
                        >
                            {/* Animated Glow Background */}
                            <div className='absolute inset-0 bg-[#3DC0DF]/5 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity blur-xl'></div>
                            
                            <div className='relative z-10 flex flex-col items-center'>
                                <div className='w-16 h-16 mb-6 flex items-center justify-center bg-white/5 rounded-2xl'>
                                    <img 
                                        src={stat.img} 
                                        className='w-10 h-10 object-contain filter brightness-0 invert' 
                                        alt={stat.label} 
                                    />
                                </div>
                                <h4 className='text-white font-extrabold text-4xl mb-2'>{stat.value}</h4>
                                <p className='text-slate-400 text-sm font-bold uppercase tracking-widest text-center'>
                                    {stat.label}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 3. Trusted Partners Section */}
                <div className=' text-center mb-12' data-aos="fade-up">
                    <h3 className='text-white font-bold text-2xl mt-8'>Trusted by Industry Leaders</h3>
                    <div className='h-1 w-12 bg-[#3DC0DF] mx-auto mt-4 rounded-full'></div>
                </div>

                <div 
                    className='bg-white/5 backdrop-blur-sm border border-white/5 rounded-[2.5rem] p-8 md:p-12'
                    data-aos="zoom-in"
                >
                    <div className='flex flex-wrap justify-center items-center gap-8 md:gap-16'>
                        {partners.map((src, index) => (
                            <div key={index} className='group flex items-center justify-center'>
                                <img 
                                    src={src} 
                                    alt="Partner" 
                                    className='h-10 md:h-12 w-auto object-contain opacity-50 filter brightness-0 invert group-hover:opacity-100 transition-all duration-300' 
                                />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default FixPart