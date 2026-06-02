import { assets } from '../assets/assets'

const AppDownload = () => {
    return (
        <div className='container px-4 sm:px-6 lg:px-8 xl:px-20 mx-auto my-16 sm:my-24 relative'>
            <div className='absolute -bottom-6 left-1/3 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl -z-10'></div>
            
            <div className='relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white p-12 sm:p-20 lg:p-24 rounded-3xl border border-slate-800 shadow-xl flex items-center justify-between'>
                {/* Graphic accents */}
                <div className='absolute top-0 right-0 w-80 h-80 bg-white/[0.01] rounded-full translate-x-1/4 -translate-y-1/4 border border-white/[0.03]'></div>
                <div className='absolute -bottom-10 -left-10 w-64 h-64 bg-white/[0.02] rounded-full border border-white/[0.04]'></div>

                <div className='relative z-10 max-w-lg'>
                    <h1 className='text-3xl sm:text-4xl font-extrabold mb-5 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-indigo-150 leading-tight'>
                        Download our mobile app for the best job hunt
                    </h1>
                    <p className='text-slate-300 text-sm sm:text-base mb-8 leading-relaxed font-normal'>
                        Search open listings, track candidate application updates, and chat with employers on the go. Get real-time alert notifications and apply instantly.
                    </p>
                    <div className='flex flex-wrap gap-4'>
                        <a href="#" className='inline-block hover:scale-[1.03] active:scale-97 transition-all hover:shadow-lg shadow-indigo-500/10'>
                            <img className='h-11 sm:h-12' src={assets.play_store} alt="Google Play Store" />
                        </a>
                        <a href="#" className='inline-block hover:scale-[1.03] active:scale-97 transition-all hover:shadow-lg shadow-indigo-500/10'>
                            <img className='h-11 sm:h-12' src={assets.app_store} alt="Apple App Store" />
                        </a>
                    </div>
                </div>

                <div className='relative shrink-0 max-lg:hidden lg:mr-10 xl:mr-20 group'>
                    {/* Glowing highlight blob behind image */}
                    <div className='absolute inset-0 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/15 transition-all duration-500'></div>
                    <img className='relative w-72 xl:w-80 h-auto bottom-[-60px] group-hover:translate-y-[-5px] transition-transform duration-500' src={assets.app_main_img} alt="Mobile Mockup" />
                </div>
            </div>
        </div>
    )
}

export default AppDownload