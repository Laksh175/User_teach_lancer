import AOS from 'aos';
import 'aos/dist/aos.css';
import Partners from './Partners'
import NextLink from 'next/link'
import { useEffect } from 'react';

export default function Hero() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, [])

  return (
    <main className="relative overflow-hidden bg-white">
      {/* Subtle Background Decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 opacity-40 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#3DC0DF] rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[300px] h-[300px] bg-blue-100 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center pt-16 pb-24 lg:pt-32">
          
          {/* LEFT CONTENT */}
          <div data-aos="fade-right">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#3DC0DF]/10 border border-[#3DC0DF]/20 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-[#3DC0DF] animate-pulse"></span>
              <span className="text-sm font-medium text-[#1a5d6d]">India’s #1 Sales Talent Platform</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              Hire Top & Verified <br />
              <span className="text-[#3DC0DF]">Sales Talent</span> <br />
              <span className="relative">
                in 7x24 Hours
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 358 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9C118.957 4.47226 237.915 2.90854 355 9" stroke="#3DC0DF" strokeWidth="6" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>

            <p className="mt-8 text-lg md:text-xl text-slate-600 max-w-lg leading-relaxed">
              India’s first teaching-based and freelancing platform connecting elite sales professionals with high-growth companies.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <NextLink href="/company">
                <button className="px-8 py-4 bg-[#3DC0DF] hover:bg-[#34a8c4] text-white font-bold rounded-xl shadow-lg shadow-[#3DC0DF]/30 transition-all transform hover:-translate-y-1">
                  Hire Sales Talent
                </button>
              </NextLink>
              <NextLink href="/sales-academy">
                <button className="px-8 py-4 bg-white border-2 border-slate-200 hover:border-[#3DC0DF] text-slate-700 font-bold rounded-xl transition-all">
                  Apply as Talent
                </button>
              </NextLink>
            </div>

            <div className="mt-8 flex items-center space-x-4">
               <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 shadow-sm" />
                  ))}
               </div>
               <p className="text-sm text-slate-500 font-medium">
                 Trusted by <span className="text-slate-900 font-bold">500+</span> top-tier companies
               </p>
            </div>
          </div>

          {/* RIGHT CONTENT - VISUALS */}
          <div className="relative mt-16 lg:mt-0" data-aos="zoom-in" data-aos-delay="200">
            <div className="relative z-10 grid grid-cols-3 gap-4 items-end">
              
              {/* Profile Card 1 */}
              <div className="bg-white/80 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-white/50 transform -rotate-6 hover:rotate-0 transition-transform duration-500">
                <div className="aspect-square bg-slate-100 rounded-xl mb-2 overflow-hidden">
                   <img src="../img/Rectangle 7.png" alt="Talent" className="w-full h-full object-cover" />
                </div>
                <div className="h-2 w-12 bg-[#3DC0DF] rounded-full mx-auto"></div>
              </div>

              {/* Profile Card 2 (Center High) */}
              <div className="bg-white p-4 rounded-2xl shadow-2xl border border-slate-100 mb-12 z-20 scale-110">
                <div className="aspect-square bg-slate-100 rounded-xl mb-3 overflow-hidden">
                   <img src="../img/Rectangle 7.png" alt="Talent" className="w-full h-full object-cover" />
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-20 bg-slate-200 rounded-full mx-auto"></div>
                  <div className="h-2 w-12 bg-[#3DC0DF]/40 rounded-full mx-auto"></div>
                </div>
              </div>

              {/* Profile Card 3 */}
              <div className="bg-white/80 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-white/50 transform rotate-6 hover:rotate-0 transition-transform duration-500">
                <div className="aspect-square bg-slate-100 rounded-xl mb-2 overflow-hidden">
                   <img src="../img/Rectangle 7.png" alt="Talent" className="w-full h-full object-cover" />
                </div>
                <div className="h-2 w-12 bg-[#3DC0DF] rounded-full mx-auto"></div>
              </div>

            </div>

            {/* Earth/Base Graphic */}
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[120%] z-0">
              <img
                className="w-full opacity-80"
                src="../img/Mask group.png"
                alt="Global Network"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Partners Section */}
      <div className="bg-slate-50/50 py-12 border-y border-slate-100">
        <Partners />
      </div>
    </main>
  )
}