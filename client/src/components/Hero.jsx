import { useContext, useRef } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Hero = () => {

    const { setSearchFilter, setIsSearched } = useContext(AppContext)

    const titleRef = useRef(null)
    const locationRef = useRef(null)

    const onSearch = () => {
        setSearchFilter({
            title: titleRef.current.value,
            location: locationRef.current.value
        })
        setIsSearched(true)
    }

    return (
        <div className='container px-4 sm:px-6 lg:px-8 xl:px-20 mx-auto my-6 sm:my-10 relative'>
            {/* Glowing blur effects */}
            <div className='absolute -top-10 left-1/4 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl -z-10'></div>
            <div className='absolute bottom-10 right-1/4 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl -z-10'></div>

            <div className='relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white py-16 sm:py-20 lg:py-24 text-center rounded-3xl shadow-xl border border-slate-800'>
                {/* Visual decorative circles */}
                <div className='absolute top-0 right-0 w-96 h-96 bg-white/[0.02] rounded-full translate-x-1/3 -translate-y-1/3 border border-white/[0.05]'></div>
                <div className='absolute bottom-0 left-0 w-80 h-80 bg-white/[0.01] rounded-full -translate-x-1/4 translate-y-1/4 border border-white/[0.03]'></div>

                <div className='relative z-10 px-4'>
                    <h2 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-indigo-200'>
                        Over 10,000+ jobs to apply
                    </h2>
                    <p className='mb-10 max-w-xl mx-auto text-sm sm:text-base text-slate-300 font-normal leading-relaxed'>
                        Your Next Big Career Move Starts Right Here - Explore the Best Job Opportunities and Take the First Step Toward Your Future!
                    </p>
                    
                    {/* Premium Search Bar */}
                    <div className='bg-white/95 backdrop-blur-md rounded-2xl text-slate-600 max-w-3xl mx-auto p-2 border border-slate-100 shadow-xl flex flex-col md:flex-row items-center gap-2'>
                        <div className='flex items-center flex-1 w-full px-3 py-2 border-b md:border-b-0 md:border-r border-slate-100'>
                            <img className='h-5 w-5 text-slate-400 mr-2.5 opacity-70' src={assets.search_icon} alt="" />
                            <input 
                                type="text"
                                placeholder='Search for jobs, skills, roles...'
                                className='text-sm sm:text-base bg-transparent outline-none w-full text-slate-800 placeholder-slate-400'
                                ref={titleRef}
                            />
                        </div>
                        <div className='flex items-center flex-1 w-full px-3 py-2'>
                            <img className='h-5 w-5 text-slate-400 mr-2.5 opacity-70' src={assets.location_icon} alt="" />
                            <input 
                                type="text"
                                placeholder='Location (e.g. Remote, Bangalore)'
                                className='text-sm sm:text-base bg-transparent outline-none w-full text-slate-800 placeholder-slate-400'
                                ref={locationRef}
                            />
                        </div>
                        <button 
                            onClick={onSearch} 
                            className='w-full md:w-auto bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:shadow-lg active:scale-98'
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>

            {/* Trusted by section */}
            <div className='bg-white border border-slate-100 shadow-sm mx-4 sm:mx-6 lg:mx-8 xl:mx-10 mt-[-24px] p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 z-20 relative transition-transform duration-300 hover:shadow-md'>
                <span className='font-semibold text-slate-500 text-sm tracking-wide uppercase shrink-0'>
                    Trusted by industry giants
                </span>
                <div className='flex items-center justify-center flex-wrap gap-x-8 gap-y-4 md:justify-end w-full'>
                    <img className='h-5 sm:h-6 hover:scale-105 active:scale-95 transition-all duration-350 cursor-pointer' src={assets.microsoft_logo} alt="Microsoft" />
                    <img className='h-5 sm:h-6 hover:scale-105 active:scale-95 transition-all duration-350 cursor-pointer' src={assets.walmart_logo} alt="Walmart" />
                    <img className='h-5 sm:h-6 hover:scale-105 active:scale-95 transition-all duration-350 cursor-pointer' src={assets.accenture_logo} alt="Accenture" />
                    <img className='h-5 sm:h-6 hover:scale-105 active:scale-95 transition-all duration-350 cursor-pointer' src={assets.samsung_logo} alt="Samsung" />
                    <img className='h-5 sm:h-6 hover:scale-105 active:scale-95 transition-all duration-350 cursor-pointer' src={assets.amazon_logo} alt="Amazon" />
                    <img className='h-5 sm:h-6 hover:scale-105 active:scale-95 transition-all duration-350 cursor-pointer' src={assets.adobe_logo} alt="Adobe" />
                </div>
            </div>

        </div>
    )
}

export default Hero