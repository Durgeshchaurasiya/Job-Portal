import { useContext } from 'react'
import { assets } from '../assets/assets'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {

    const { openSignIn } = useClerk()
    const { user } = useUser()

    const navigate = useNavigate()

    const { setShowRecruiterLogin } = useContext(AppContext)

    return (
        <header className='sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 border-b border-slate-100 shadow-sm transition-all duration-300'>
            <div className='container px-4 sm:px-6 lg:px-8 xl:px-20 mx-auto flex justify-between items-center h-16 sm:h-20'>
                <img 
                    onClick={() => navigate('/')} 
                    className='cursor-pointer h-7 sm:h-9 hover:opacity-90 active:scale-95 transition-all' 
                    src={assets.logo} 
                    alt="Logo" 
                />
                {
                    user
                        ? <div className='flex items-center gap-4 sm:gap-6'>
                            <Link 
                                to={'/applications'} 
                                className='text-slate-600 hover:text-indigo-600 font-medium text-sm sm:text-base transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-50'
                            >
                                Applied Jobs
                            </Link>
                            <span className='h-4 w-px bg-slate-200'></span>
                            <span className='max-sm:hidden text-slate-700 font-medium text-sm'>
                                Hi, {user.firstName || user.username}
                            </span>
                            <div className='hover:scale-105 active:scale-95 transition-all'>
                                <UserButton afterSignOutUrl="/" />
                            </div>
                        </div>
                        : <div className='flex items-center gap-2 sm:gap-4 text-xs sm:text-sm'>
                            <button 
                                onClick={() => setShowRecruiterLogin(true)} 
                                className='text-slate-600 hover:text-indigo-600 font-medium px-3 sm:px-4 py-2 rounded-full hover:bg-slate-50 transition-all'
                            >
                                Recruiter Login
                            </button>
                            <button 
                                onClick={() => openSignIn()} 
                                className='bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white px-5 sm:px-7 py-2 rounded-full font-medium shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200'
                            >
                                Login
                            </button>
                        </div>
                }
            </div>
        </header>
    )
}

export default Navbar