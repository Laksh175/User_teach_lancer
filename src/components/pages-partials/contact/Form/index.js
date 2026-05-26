import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getInToTouch } from '../../../../store/action/Comman/adddata';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Mail, Phone, User, MessageSquare, Send } from 'lucide-react'; // Optional: npm install lucide-react

const Form = ({ dispatch, res }) => {
    const navigation = {
        social: [
            { id: 2, name: 'Instagram', href: 'https://www.instagram.com/vaionex/', img: '/img/Asset 5 16.png' },
            { id: 3, name: 'Facebook', href: 'https://www.facebook.com/vaionex/', img: '/img/Asset 5 15.png' },
            { id: 4, name: 'LinkedIn', href: 'https://www.linkedin.com/company/vaionex/', img: '/img/Asset 5 14.png' },
            { id: 6, name: 'Twitter', href: 'https://twitter.com/vaionex', img: '/img/Asset 5 12.png' },
        ],
    }

    const [data, setData] = useState({ name: "", email: "", mobile: "", message: "" })

    const handleInput = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const onSubmit = () => {
        if(!data.name || !data.email) {
            toast.error("Please fill in required fields");
            return;
        }
        dispatch(getInToTouch(data))
    }

    useEffect(() => {
        const dataa = res.data?.data?.data
        if (dataa?.code === 201) {
            toast.success(dataa.message);
            setData({ name: "", email: "", mobile: "", message: "" }); // Reset form
        }
    }, [res])

    return (
        <section className="py-20 bg-slate-50">
            <ToastContainer position="top-center" />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/60 overflow-hidden border border-slate-100">
                    <div className="grid lg:grid-cols-2">
                        
                        {/* LEFT SIDE: Visual & Socials */}
                        <div className="bg-[#1A2235] p-12 flex flex-col items-center justify-center text-center">
                            <div className="mb-8" data-aos="fade-right">
                                <h2 className="text-3xl font-bold text-white mb-4">Let's start a <span className="text-[#3DC0DF]">Conversation</span></h2>
                                <p className="text-slate-400 text-sm max-w-xs mx-auto">
                                    Have questions about hiring or applying? Our team is here to help you grow.
                                </p>
                            </div>
                            
                            <img 
                                src="/img/image 21.png" 
                                className="w-full max-w-[320px] h-auto object-contain mb-10 drop-shadow-2xl" 
                                alt="Contact Us"
                            />

                            <div className="flex gap-4">
                                {navigation.social.map((item) => (
                                    <a
                                        key={item.id}
                                        href={item.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#3DC0DF] transition-all duration-300 group"
                                    >
                                        <img src={item.img} alt={item.name} className="w-5 h-5 invert brightness-0" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT SIDE: Actual Form */}
                        <div className="p-8 lg:p-12">
                            <div className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Name Field */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                            <User size={16} className="text-[#3DC0DF]" /> Full Name*
                                        </label>
                                        <input 
                                            type="text" 
                                            name="name"
                                            placeholder="John Doe" 
                                            className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:border-[#3DC0DF] focus:ring-4 focus:ring-[#3DC0DF]/10 outline-none transition-all"
                                            onChange={handleInput} 
                                            value={data.name} 
                                        />
                                    </div>

                                    {/* Mobile Field */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                            <Phone size={16} className="text-[#3DC0DF]" /> Mobile*
                                        </label>
                                        <input 
                                            type="text" 
                                            name="mobile"
                                            placeholder="+91 00000 00000" 
                                            className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:border-[#3DC0DF] focus:ring-4 focus:ring-[#3DC0DF]/10 outline-none transition-all"
                                            onChange={handleInput} 
                                            value={data.mobile} 
                                        />
                                    </div>
                                </div>

                                {/* Email Field */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                        <Mail size={16} className="text-[#3DC0DF]" /> Email Address*
                                    </label>
                                    <input 
                                        type="email" 
                                        name="email"
                                        placeholder="john@example.com" 
                                        className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:border-[#3DC0DF] focus:ring-4 focus:ring-[#3DC0DF]/10 outline-none transition-all"
                                        onChange={handleInput} 
                                        value={data.email} 
                                    />
                                </div>

                                {/* Message Field */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                        <MessageSquare size={16} className="text-[#3DC0DF]" /> Your Message*
                                    </label>
                                    <textarea 
                                        rows="4" 
                                        name="message"
                                        placeholder="How can we help you?"
                                        className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:border-[#3DC0DF] focus:ring-4 focus:ring-[#3DC0DF]/10 outline-none transition-all resize-none"
                                        onChange={handleInput} 
                                        value={data.message}
                                    ></textarea>
                                </div>

                                {/* Submit Button */}
                                <div className="pt-4">
                                    <button 
                                        onClick={onSubmit}
                                        className="w-full bg-[#3DC0DF] hover:bg-[#34a8c4] text-white font-bold py-4 rounded-xl shadow-lg shadow-[#3DC0DF]/30 flex items-center justify-center gap-2 group transition-all transform active:scale-[0.98]"
                                    >
                                        <span>Send Message</span>
                                        <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}

const mapStateToProps = (state) => ({
    res: state.getInToTouch
})

export default connect(mapStateToProps)(Form)