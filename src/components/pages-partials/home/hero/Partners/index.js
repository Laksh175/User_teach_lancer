import React, { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';
// Import Swiper modules
import { Autoplay } from 'swiper/modules';

const Partners = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, [])

    const partnerLogos = [
        { src: "/img/par1.png", alt: "Partner 1", width: "w-24" },
        { src: "/img/chai.png", alt: "Partner 2", width: "w-24" },
        { src: "/img/skill.png", alt: "Partner 3", width: "w-40" },
        { src: "/img/logic.png", alt: "Partner 4", width: "w-36" },
        { src: "/img/doller.png", alt: "Partner 5", width: "w-20" },
        { src: "/img/symb 1.png", alt: "Partner 6", width: "w-24" },
        // Duplicating for a smoother infinite flow
        { src: "/img/par1.png", alt: "Partner 1", width: "w-24" },
        { src: "/img/chai.png", alt: "Partner 2", width: "w-24" },
    ];

    return (
        <section className="py-16 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Header */}
                <div className="text-center mb-12" data-aos="fade-up">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-[#3DC0DF] mb-2">
                        Trusted Growth Partners
                    </h2>
                    <p className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight">
                        Powering sales for India's leading brands
                    </p>
                </div>

                {/* Carousel Container */}
                <div 
                    className="bg-slate-50/50 rounded-[2rem] py-12 border border-slate-100 shadow-sm"
                    data-aos="fade-up" 
                    data-aos-delay="200"
                >
                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={40}
                        slidesPerView={2}
                        loop={true}
                        speed={4000} // Speed of the transition
                        autoplay={{
                            delay: 0, // 0 delay for continuous motion
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            640: { slidesPerView: 3 },
                            768: { slidesPerView: 4 },
                            1024: { slidesPerView: 6 },
                        }}
                        // This makes the transition linear (smooth continuous scroll)
                        style={{ transitionTimingFunction: 'linear' }}
                        className="partner-swiper"
                    >
                        {partnerLogos.map((logo, index) => (
                            <SwiperSlide key={index}>
                                <div className="group flex justify-center items-center h-20 px-4">
                                    <img
                                        src={logo.src}
                                        alt={logo.alt}
                                        className={`${logo.width} h-auto object-contain transition-all duration-300 filter drop-shadow-sm group-hover:drop-shadow-md group-hover:scale-110`}
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Bottom line decoration */}
                <div className="mt-12 flex justify-center opacity-20">
                    <div className="h-[1px] w-full max-w-md bg-gradient-to-r from-transparent via-slate-400 to-transparent"></div>
                </div>
            </div>
        </section>
    );
};

export default Partners;