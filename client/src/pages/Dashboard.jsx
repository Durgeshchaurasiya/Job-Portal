import { useContext, useEffect } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Dashboard = () => {

    const navigate = useNavigate()

    const { companyData, setCompanyData, setCompanyToken } = useContext(AppContext)

    // Function to logout for company
    const logout = () => {
        setCompanyToken(null)
        localStorage.removeItem('companyToken')
        setCompanyData(null)
        navigate('/')
    }

    useEffect(() => {
        if (companyData) {
            navigate('/dashboard/manage-jobs')
        }
    }, [companyData])

    return (
        <div className='min-h-screen bg-slate-50/30 flex flex-col'>

            {/* Navbar for Recruiter Panel */}
            <header className='sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 border-b border-slate-100 shadow-sm transition-all duration-300'>
                <div className='px-6 lg:px-12 flex justify-between items-center h-16 sm:h-20'>
                    <img 
                        onClick={() => navigate('/')} 
                        className='cursor-pointer h-7 sm:h-9 hover:opacity-90 active:scale-95 transition-all' 
                        src={assets.logo} 
                        alt="Logo" 
                    />
                    
                    {companyData && (
                        <div className='flex items-center gap-4 text-sm sm:text-base'>
                            <span className='max-sm:hidden text-slate-500 font-medium'>
                                Welcome, <strong className='text-slate-800 font-bold'>{companyData.name}</strong>
                            </span>
                            <div className='relative group'>
                                <div className='h-9 w-9 p-0.5 bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center overflow-hidden cursor-pointer shadow-sm group-hover:scale-105 active:scale-95 transition-all'>
                                    <img className='h-full w-full rounded-full object-cover' src={companyData.image} alt="" />
                                </div>
                                <div className='absolute hidden group-hover:block top-full right-0 z-50 pt-2 w-40'>
                                    <div className='bg-white/95 backdrop-blur-md border border-slate-100 shadow-lg rounded-2xl p-1.5'>
                                        <button 
                                            onClick={logout} 
                                            className='w-full text-left py-2 px-4 text-xs sm:text-sm font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-all cursor-pointer'
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            <div className='flex flex-1 items-stretch'>

                {/* Left Sidebar */}
                <aside className='bg-white border-r border-slate-150/60 min-h-screen py-6 lg:w-64 sm:w-20 w-16 shrink-0 transition-all duration-300 z-10'>
                    <ul className='flex flex-col gap-1 items-start text-slate-600 px-2 sm:px-3'>
                        <NavLink 
                            className={({ isActive }) => `flex items-center py-3.5 px-4 sm:px-6 gap-3.5 w-full rounded-xl transition-all duration-200 ${isActive ? 'bg-indigo-50 border-r-4 border-indigo-600 text-indigo-600 font-bold shadow-sm' : 'hover:bg-slate-50 hover:text-slate-900 font-semibold'}`} 
                            to={'/dashboard/add-job'}
                        >
                            <img className='h-4.5 w-4.5 opacity-80 shrink-0' src={assets.add_icon} alt="" />
                            <span className='max-lg:hidden text-sm'>Add Job</span>
                        </NavLink>

                        <NavLink 
                            className={({ isActive }) => `flex items-center py-3.5 px-4 sm:px-6 gap-3.5 w-full rounded-xl transition-all duration-200 ${isActive ? 'bg-indigo-50 border-r-4 border-indigo-600 text-indigo-600 font-bold shadow-sm' : 'hover:bg-slate-50 hover:text-slate-900 font-semibold'}`} 
                            to={'/dashboard/manage-jobs'}
                        >
                            <img className='h-4.5 w-4.5 opacity-80 shrink-0' src={assets.home_icon} alt="" />
                            <span className='max-lg:hidden text-sm'>Manage Jobs</span>
                        </NavLink>

                        <NavLink 
                            className={({ isActive }) => `flex items-center py-3.5 px-4 sm:px-6 gap-3.5 w-full rounded-xl transition-all duration-200 ${isActive ? 'bg-indigo-50 border-r-4 border-indigo-600 text-indigo-600 font-bold shadow-sm' : 'hover:bg-slate-50 hover:text-slate-900 font-semibold'}`} 
                            to={'/dashboard/view-applications'}
                        >
                            <img className='h-4.5 w-4.5 opacity-80 shrink-0' src={assets.person_tick_icon} alt="" />
                            <span className='max-lg:hidden text-sm'>View Applicants</span>
                        </NavLink>
                    </ul>
                </aside>

                {/* Main Content Area */}
                <main className='flex-1 bg-slate-50/50 p-6 sm:p-8 lg:p-10 min-h-screen overflow-x-hidden'>
                    <div className='max-w-6xl mx-auto'>
                        <Outlet />
                    </div>
                </main>

            </div>

        </div>
    )
}

export default Dashboard