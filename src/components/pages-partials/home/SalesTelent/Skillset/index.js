import React, { useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Briefcase, CheckCircle2 } from 'lucide-react'; // Optional icons

const Skillset = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, [])

  const mainRoles = [
    "Sales Interz",
    "Sales Consultant",
    "Sales Coach",
    "Sales Trainer"
  ];

  const skillTags = [
    "B2C", "CRM", "Relationship", "RFPs", "PowerPoint", "Presentation", 
    "Design Thinking", "System Design", "Corporate Sales", "Enterprise Sales", 
    "SaaS Sales", "Agile", "Pitch", "Outbound Sales", "Direct Selling", 
    "Key Account Management", "Inside Sales", "Email Marketing", 
    "Sales Engagement", "Forecasting", "Business Intelligence", "B2B", 
    "Pre-sales", "Inbound Sales", "B2C2B", "Sales Enablement", "Channel Sales"
  ];

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-down">
          <h2 className="text-[#3DC0DF] font-bold tracking-widest uppercase text-sm mb-3">Opportunities</h2>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Find Sales Jobs That Fit Your <span className="text-[#3DC0DF]">Skillset</span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          
          {/* LEFT: Core Category Card */}
          <div 
            className="lg:col-span-1 bg-slate-50 rounded-3xl p-8 border border-slate-100 shadow-sm sticky top-10"
            data-aos="fade-right"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#3DC0DF] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#3DC0DF]/30">
                <Briefcase size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">Business Development</h3>
            </div>
            
            <div className="space-y-4">
              {mainRoles.map((role, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-100 hover:border-[#3DC0DF]/50 hover:shadow-md transition-all group">
                  <CheckCircle2 size={18} className="text-[#3DC0DF] opacity-40 group-hover:opacity-100" />
                  <span className="font-semibold text-slate-700 group-hover:text-slate-900">{role}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Skill Tag Cloud */}
          <div className="lg:col-span-2" data-aos="fade-left">
            <div className="mb-6">
              <h4 className="text-lg font-bold text-slate-800 mb-2">Master These Skills</h4>
              <p className="text-slate-500 text-sm">Our partners look for talent across these core competencies.</p>
            </div>

            <div className="flex flex-wrap gap-3">
              {skillTags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-5 py-2.5 bg-white border border-slate-200 rounded-full text-slate-600 text-sm font-medium hover:border-[#3DC0DF] hover:text-[#3DC0DF] hover:bg-[#3DC0DF]/5 transition-all cursor-default shadow-sm active:scale-95"
                  style={{ transitionDelay: `${index * 30}ms` }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Decorative background element */}
            <div className="mt-12 p-8 bg-gradient-to-br from-[#3DC0DF]/10 to-transparent rounded-3xl border border-[#3DC0DF]/10 relative overflow-hidden">
              <div className="relative z-10">
                <h5 className="font-bold text-slate-800 mb-1">Ready to showcase your skills?</h5>
                <p className="text-slate-600 text-sm">Join the top 1% of sales professionals in India.</p>
              </div>
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-[#3DC0DF]/20 rounded-full blur-3xl"></div>
            </div>
          </div>

        </div>
      </div>
    </section>

  )
}

export default Skillset