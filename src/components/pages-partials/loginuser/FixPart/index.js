import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const FixPart = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out',
    });
  }, []);

  const stats = [
    {
      icon: '../img/Asset 32 1.png',
      value: '500+',
      label: 'Sales Talents',
      aos: 'fade-up',
    },
    {
      icon: '../img/Asset 30 1.png',
      value: '100+',
      label: 'Sales Skills',
      aos: 'fade-up',
    },
    {
      icon: '../img/Asset 28 1.png',
      value: '100%',
      label: 'Verified Sales Talents',
      aos: 'fade-up',
    },
    {
      icon: '../img/Asset 38 1.png',
      value: '25+',
      label: 'Companies Onboarded',
      aos: 'fade-up',
    },
  ];

  const partnersTop = [
    '../img/par1.png',
    '../img/chai.png',
    '../img/Group 19.png',
  ];

  const partnersBottom = [
    '../img/skill.png',
    '../img/logic.png',
    '../img/doller.png',
    '../img/symb 1.png',
  ];

  return (
    <section className="bg-[#202040] h-full py-16 md:py-24 overflow-hidden">
      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2
          className="text-3xl md:text-4xl font-bold text-white text-center mb-12 tracking-tight"
          data-aos="fade-down"
        >
          Hire Top and Verified Sales Talent
        </h2>

        <div className="grid grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-[#3DC0DF]/10 backdrop-blur-sm border border-[#3DC0DF]/20 rounded-2xl p-6 md:p-8 flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#3DC0DF]/20 group"
              data-aos={stat.aos}
              data-aos-delay={idx * 100}
            >
              <img
                src={stat.icon}
                alt=""
                className="w-14 h-14 md:w-16 md:h-16 mb-4 object-contain transition-transform duration-300 group-hover:scale-110"
              />
              <h4 className="text-4xl md:text-5xl font-extrabold text-white mb-2">
                {stat.value}
              </h4>
              <p className="text-[#e2e8f0] uppercase text-sm md:text-base font-medium tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FixPart;