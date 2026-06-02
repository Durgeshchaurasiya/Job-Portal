import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate()

  return (
    <footer className='bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-8 mt-20 relative overflow-hidden'>
      {/* Decorative gradient blob */}
      <div className='absolute bottom-0 right-0 w-80 h-80 bg-indigo-650/5 rounded-full blur-3xl -z-10'></div>
      <div className='absolute top-0 left-10 w-64 h-64 bg-violet-650/5 rounded-full blur-3xl -z-10'></div>

      <div className='container px-4 sm:px-6 lg:px-8 xl:px-20 mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 relative z-10'>
        {/* Brand section */}
        <div className='flex flex-col gap-4 md:col-span-1'>
          <img 
            onClick={() => { navigate('/'); scrollTo(0, 0) }} 
            width={140} 
            className='cursor-pointer brightness-0 invert opacity-90 hover:opacity-100 transition-all' 
            src={assets.logo} 
            alt="InsiderJobs Logo" 
          />
          <p className='text-slate-400 text-sm leading-relaxed mt-2'>
            InsiderJobs connects forward-thinking companies with exceptional global talent. Find your perfect match today.
          </p>
          <div className='flex gap-3.5 mt-2'>
            <a href="#" className='h-9 w-9 flex items-center justify-center rounded-full bg-slate-900 border border-slate-800 hover:border-indigo-500 hover:bg-indigo-600 text-white hover:scale-110 hover:-translate-y-0.5 active:scale-95 transition-all shadow-sm'>
              <img className='h-4 w-4 brightness-0 invert' src={assets.facebook_icon} alt="Facebook" />
            </a>
            <a href="#" className='h-9 w-9 flex items-center justify-center rounded-full bg-slate-900 border border-slate-800 hover:border-indigo-500 hover:bg-indigo-600 text-white hover:scale-110 hover:-translate-y-0.5 active:scale-95 transition-all shadow-sm'>
              <img className='h-4 w-4 brightness-0 invert' src={assets.twitter_icon} alt="Twitter" />
            </a>
            <a href="#" className='h-9 w-9 flex items-center justify-center rounded-full bg-slate-900 border border-slate-800 hover:border-indigo-500 hover:bg-indigo-600 text-white hover:scale-110 hover:-translate-y-0.5 active:scale-95 transition-all shadow-sm'>
              <img className='h-4 w-4 brightness-0 invert' src={assets.instagram_icon} alt="Instagram" />
            </a>
          </div>
        </div>

        {/* Column 2: Candidates */}
        <div>
          <h4 className='font-bold text-white text-sm tracking-wider uppercase mb-4'>For Candidates</h4>
          <ul className='space-y-2.5 text-sm'>
            <li><a href="#" className='hover:text-white transition-colors duration-200'>Browse Jobs</a></li>
            <li><a href="#" className='hover:text-white transition-colors duration-200'>Applied Positions</a></li>
            <li><a href="#" className='hover:text-white transition-colors duration-200'>Create Account</a></li>
            <li><a href="#" className='hover:text-white transition-colors duration-200'>Career Resources</a></li>
          </ul>
        </div>

        {/* Column 3: Recruiters */}
        <div>
          <h4 className='font-bold text-white text-sm tracking-wider uppercase mb-4'>For Recruiters</h4>
          <ul className='space-y-2.5 text-sm'>
            <li><a href="#" className='hover:text-white transition-colors duration-200'>Post a Job</a></li>
            <li><a href="#" className='hover:text-white transition-colors duration-200'>Talent Sourcing</a></li>
            <li><a href="#" className='hover:text-white transition-colors duration-200'>Enterprise Solutions</a></li>
            <li><a href="#" className='hover:text-white transition-colors duration-200'>Pricing Plans</a></li>
          </ul>
        </div>

        {/* Column 4: Contact/Newsletter */}
        <div>
          <h4 className='font-bold text-white text-sm tracking-wider uppercase mb-4'>Stay Connected</h4>
          <p className='text-slate-400 text-sm leading-relaxed mb-4'>
            Subscribe to our newsletter to receive the latest job updates and market insights.
          </p>
          <div className='flex gap-2 max-w-sm'>
            <input 
              type="email" 
              placeholder='Enter email address'
              className='bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-sm text-white w-full outline-none transition-colors'
            />
            <button className='bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-bold px-4 rounded-xl transition-all shadow-sm hover:shadow active:scale-97 cursor-pointer shrink-0'>
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom copy */}
      <div className='container px-4 sm:px-6 lg:px-8 xl:px-20 mx-auto pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10'>
        <p className='text-slate-500 text-xs font-medium text-center sm:text-left'>
          Copyright © {new Date().getFullYear()} InsiderJobs.dev | All rights reserved.
        </p>
        <div className='flex gap-6 text-xs text-slate-500 font-semibold'>
          <a href="#" className='hover:text-white transition-colors'>Privacy Policy</a>
          <a href="#" className='hover:text-white transition-colors'>Terms of Service</a>
          <a href="#" className='hover:text-white transition-colors'>Sitemap</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
