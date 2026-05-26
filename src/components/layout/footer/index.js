/* Updated Navigation Data */
const navigation = {
  solutions: [
    { name: 'Sales Intern', href: '#' },
    { name: 'Business Development', href: '#' },
    { name: 'Customer Success', href: '#' },
    { name: 'Sales Representative (SDR)', href: '#' },
  ],
  support: [
    { name: 'Team', href: '#' },
    { name: 'Sales Academy', href: '#' },
    { name: 'Hiring Process', href: '#' },
    { name: 'Talent Process', href: '#' },
  ],
  company: [
    { name: 'Reach Us', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Hirer FAQs', href: '#' },
    { name: 'Talent FAQs', href: '#' },
  ],
  social: [
    { name: 'Facebook', href: '#', img: '/img/Asset 5 8.png' },
    { name: 'Instagram', href: '#', img: '/img/Asset 5 7.png' },
    { name: 'Twitter', href: '#', img: '/img/Asset 5 6.png' },
    { name: 'LinkedIn', href: '#', img: '/img/Asset 5 5.png' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-[#1A2235] text-white">
      {/* Main Footer Section */}
      <div className="max-w-7xl mx-auto pt-16 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand & Newsletter Column */}
          <div className="lg:col-span-4">
            <img
              className="h-10 w-auto mb-6 brightness-0 invert" // Professional white-out logo
              src="/img/logo.png"
              alt="TEACHLANCER"
            />
            <p className="text-slate-400 text-sm mb-6 max-w-sm">
              India’s First Teaching Based and Freelancing Based Platform. Join our newsletter to stay up to date on features and releases.
            </p>
            
            {/* Newsletter Input */}
            <form className="flex max-w-sm gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-[#242E45] border border-slate-700 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:border-[#3DC0DF] transition-all"
              />
              <button className="bg-[#3DC0DF] hover:bg-[#34a8c4] text-white px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap">
                Join
              </button>
            </form>
            
            {/* Social Icons */}
            <div className="flex gap-4 mt-8">
              {navigation.social.map((item, idx) => (
                <a 
                  key={idx} 
                  href={item.href} 
                  className="bg-[#242E45] p-2 rounded-full hover:bg-[#3DC0DF] transition-all duration-300 transform hover:-translate-y-1"
                >
                  <img src={item.img} alt={item.name} className="w-5 h-5 object-contain invert brightness-0" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold mb-4 flex flex-col">
              Preferred Talents
              <span className="w-8 h-1 bg-[#3DC0DF] mt-2 rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              {navigation.solutions.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-slate-400 hover:text-[#3DC0DF] text-sm transition-colors no-underline">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold mb-4 flex flex-col">
              About Us
              <span className="w-8 h-1 bg-[#3DC0DF] mt-2 rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              {navigation.support.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-slate-400 hover:text-[#3DC0DF] text-sm transition-colors no-underline">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold mb-4 flex flex-col">
              Company
              <span className="w-8 h-1 bg-[#3DC0DF] mt-2 rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-slate-400 hover:text-[#3DC0DF] text-sm transition-colors no-underline">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="india group cursor-pointer">
              <img src="/img/image 1.png" alt="Made in India" className="h-8 group-hover:scale-110 transition-transform" />
            </div>
            <div className="h-8 w-[1px] bg-slate-800 hidden md:block"></div>
            <p className="text-slate-500 text-xs">
              © {new Date().getFullYear()} TEACHLANCER™. All rights reserved.
            </p>
          </div>
          
          <div className="flex gap-6 text-xs text-slate-500">
            <a href="#" className="hover:text-white transition-colors no-underline">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors no-underline">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors no-underline">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}