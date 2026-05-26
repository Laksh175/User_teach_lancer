import React, { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { CheckCircle, Search, UserCheck, MessageSquare, Target } from 'lucide-react'; // Optional: Install lucide-react or use SVGs

const Magic = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, [])

    const steps = [
        {
            title: "Post Your Sales Role Requirement",
            desc: "Tell us exactly who you need, and our system starts the hunt immediately.",
            icon: <Search className="w-5 h-5" />,
        },
        {
            title: "Get Verified Sales Talent Match",
            desc: "Our AI-driven engine filters the top 1% of talent for your specific niche.",
            icon: <Target className="w-5 h-5" />,
        },
        {
            title: "Check Sales Talent Credentials",
            desc: "Review verified work history, teaching scores, and past performance data.",
            icon: <UserCheck className="w-5 h-5" />,
        },
        {
            title: "Conduct Discussion",
            desc: "Connect directly with candidates through our streamlined interview setup.",
            icon: <MessageSquare className="w-5 h-5" />,
        },
        {
            title: "Select Right Match",
            desc: "Onboard your winner and start scaling your revenue instantly.",
            icon: <CheckCircle className="w-5 h-5" />,
        },
    ];

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="text-center mb-20" data-aos="fade-up">
                    <h2 className="text-[#3DC0DF] font-bold tracking-widest uppercase text-sm mb-3">Our Process</h2>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                        The TEACHLANCER™ <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3DC0DF] to-blue-600">Match Making Magic</span>
                    </h1>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Left Side: Stepper */}
                    <div className="relative">
                        {/* The Connecting Line */}
                        <div className="absolute left-[27px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-[#3DC0DF] via-[#3DC0DF]/50 to-transparent z-0"></div>

                        <div className="space-y-10 relative z-10">
                            {steps.map((step, index) => (
                                <div 
                                    key={index} 
                                    className="group flex items-start gap-6" 
                                    data-aos="fade-right" 
                                    data-aos-delay={index * 150}
                                >
                                    {/* Number/Icon Bubble */}
                                    <div className="flex-shrink-0 w-14 h-14 rounded-full bg-white border-2 border-[#3DC0DF] flex items-center justify-center text-[#3DC0DF] group-hover:bg-[#3DC0DF] group-hover:text-white transition-all duration-300 shadow-lg shadow-[#3DC0DF]/20">
                                        <span className="font-bold text-lg">{index + 1}</span>
                                    </div>

                                    {/* Text Content */}
                                    <div className="pt-2">
                                        <h3 className="text-xl md:text-2xl font-bold text-slate-800 group-hover:text-[#3DC0DF] transition-colors duration-300">
                                            {step.title}
                                        </h3>
                                        <p className="text-slate-500 mt-2 leading-relaxed max-w-md">
                                            {step.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Visual Magic Box */}
                    <div className="relative lg:h-[600px] flex items-center justify-center" data-aos="zoom-in-left">
                        {/* Decorative background blurs */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#3DC0DF]/10 rounded-full blur-[100px] z-0"></div>
                        
                        {/* Main "Dashboard" Mockup Card */}
                        <div className="relative z-10 w-full max-w-md aspect-[4/3] bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-700 p-8 overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-700">
                            {/* Inner Mockup UI */}
                            <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>
                                <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Matchmaking Engine</div>
                            </div>

                            <div className="space-y-6">
                                <div className="animate-pulse flex items-center gap-4">
                                    <div className="w-12 h-12 bg-slate-800 rounded-full"></div>
                                    <div className="flex-1 space-y-2">
                                        <div className="h-2 bg-slate-800 rounded w-3/4"></div>
                                        <div className="h-2 bg-[#3DC0DF]/30 rounded w-1/2"></div>
                                    </div>
                                    <div className="text-[#3DC0DF] font-bold text-xs">98% Match</div>
                                </div>

                                <div className="p-4 bg-[#3DC0DF]/10 border border-[#3DC0DF]/20 rounded-xl">
                                    <div className="text-[10px] text-[#3DC0DF] uppercase font-bold mb-2">Verifying Credentials...</div>
                                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                        <div className="bg-[#3DC0DF] h-full w-[85%] animate-[shimmer_2s_infinite]"></div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="h-20 bg-slate-800 rounded-xl border border-slate-700"></div>
                                    <div className="h-20 bg-slate-800 rounded-xl border border-slate-700"></div>
                                </div>
                            </div>

                            {/* Floating "Magic" Badge */}
                            <div className="absolute bottom-6 right-6 bg-[#3DC0DF] text-white px-4 py-2 rounded-full text-xs font-bold shadow-xl animate-bounce">
                                Magic Match Found! ✨
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Magic;