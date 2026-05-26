import React, { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Quote, Star } from 'lucide-react'; // Optional: npm install lucide-react

const ClientSay = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, [])

    const data = [
        {
            id: "1",
            img: "/img/Saumya 1.png",
            name: "Saumya Gupta",
            role: "SYMB Technologies",
            text: "The TEACHLANCER has trained me to close dynamically in the midmarket space. They support you to succeed, raise your leadership skills, and put the latest technology at your fingertips so you can reach customers effectively."
        },
        {
            id: "2",
            img: "/img/Monika 1.png",
            name: "Monika Malik",
            role: "LogicalFire",
            text: "It gives me pleasure to share my experience. The TEACHLANCER holds deep knowledge of sales strategies and provided flexible timings that helped me understand business optimization strategies perfectly."
        },
        {
            id: "3",
            img: "/img/Kundan 1.png",
            name: "Kundan Kumar",
            role: "Dramantram",
            text: "The TEACHLANCER helped us find the right sales talent match in just 24 hours. The talent was fresh but well-versed in the latest technology and market trends, helping our early-stage company succeed."
        }
    ]

    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white to-transparent"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                {/* Header */}
                <div className="text-center mb-16" data-aos="fade-up">
                    <h2 className="text-[#3DC0DF] font-bold tracking-widest uppercase text-sm mb-3">Testimonials</h2>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
                        What Our Community <span className="text-[#3DC0DF]">Says About Us</span>
                    </h1>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.map((val, index) => (
                        <div 
                            key={val.id} 
                            className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col relative group hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            {/* Decorative Quote Icon */}
                            <Quote className="absolute top-6 right-8 w-10 h-10 text-slate-100 group-hover:text-[#3DC0DF]/20 transition-colors" />

                            {/* Star Rating */}
                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} className="fill-[#3DC0DF] text-[#3DC0DF]" />
                                ))}
                            </div>

                            {/* Testimonial Text */}
                            <p className="text-slate-600 leading-relaxed mb-8 italic relative z-10">
                                "{val.text}"
                            </p>

                            {/* Author Info */}
                            <div className="mt-auto flex items-center gap-4">
                                <div className="relative">
                                    <img 
                                        src={val.img} 
                                        alt={val.name} 
                                        className="w-14 h-14 rounded-full object-cover border-2 border-white ring-2 ring-[#3DC0DF]/30"
                                    />
                                    <div className="absolute -bottom-1 -right-1 bg-[#3DC0DF] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 leading-tight uppercase tracking-tight text-sm">
                                        {val.name}
                                    </h4>
                                    <p className="text-[#3DC0DF] text-xs font-medium uppercase tracking-wider">
                                        {val.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Trust Footer */}
                <div className="mt-16 text-center" data-aos="fade-up">
                    <p className="text-slate-400 text-sm font-medium">
                        Join 2,000+ satisfied sales professionals and companies
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ClientSay;