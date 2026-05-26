import React, { useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';

const SaleStory = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, [])

    const platforms = [
        { 
            name: "LinkedIn", 
            img: "/img/LinkedIn_Logo 1.png", 
            link: "#", 
            hover: "hover:border-blue-500",
            shadow: "hover:shadow-blue-500/10" 
        },
        { 
            name: "Quora", 
            img: "/img/Quora-Logo 1.png", 
            link: "#", 
            hover: "hover:border-red-600",
            shadow: "hover:shadow-red-600/10" 
        },
        { 
            name: "Medium", 
            img: "/img/Medium-logo 1.png", 
            link: "#", 
            hover: "hover:border-black",
            shadow: "hover:shadow-black/10" 
        },
        { 
            name: "YouTube", 
            img: "/img/YouTube-Logo 1.png", 
            link: "#", 
            hover: "hover:border-red-500",
            shadow: "hover:shadow-red-500/10" 
        },
    ]

    return (
        <section className="py-20 bg-slate-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="text-center mb-16" data-aos="fade-down">
                    <h2 className="text-[#3DC0DF] font-bold tracking-widest uppercase text-sm mb-3">Community & Insights</h2>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                        Read Our <span className="text-[#3DC0DF]">Sales Stories</span>
                    </h1>
                    <p className="text-slate-500 max-w-2xl mx-auto">
                        Follow our journey and get expert sales tips across all our social platforms.
                    </p>
                </div>

                {/* Platform Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {platforms.map((platform, index) => (
                        <a 
                            href={platform.link} 
                            key={index}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group bg-white border border-slate-100 rounded-2xl p-8 flex items-center justify-center h-32 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl ${platform.hover} ${platform.shadow}`}
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <img 
                                src={platform.img} 
                                alt={platform.name} 
                                className="max-h-12 w-auto object-contain transition-all duration-500 filter grayscale group-hover:grayscale-0 group-hover:scale-110" 
                            />
                        </a>
                    ))}
                </div>

                {/* Optional Footer CTA */}
                <div className="mt-12 text-center" data-aos="fade-up">
                    <button className="text-slate-400 hover:text-[#3DC0DF] font-semibold text-sm transition-colors flex items-center justify-center mx-auto gap-2">
                        View all resources
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </div>

            </div>
        </section>
    )
}

export default SaleStory