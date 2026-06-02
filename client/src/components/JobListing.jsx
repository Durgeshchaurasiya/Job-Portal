import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets, JobCategories, JobLocations } from '../assets/assets'
import JobCard from './JobCard'

const JobListing = () => {

    const { isSearched, searchFilter, setSearchFilter, jobs } = useContext(AppContext)

    const [showFilter, setShowFilter] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedLocations, setSelectedLocations] = useState([])

    const [filteredJobs, setFilteredJobs] = useState(jobs)

    const handleCategoryChange = (category) => {
        setSelectedCategories(
            prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
        )
    }

    const handleLocationChange = (location) => {
        setSelectedLocations(
            prev => prev.includes(location) ? prev.filter(c => c !== location) : [...prev, location]
        )
    }

    useEffect(() => {

        const matchesCategory = job => selectedCategories.length === 0 || selectedCategories.includes(job.category)

        const matchesLocation = job => selectedLocations.length === 0 || selectedLocations.includes(job.location)

        const matchesTitle = job => searchFilter.title === "" || job.title.toLowerCase().includes(searchFilter.title.toLowerCase())

        const matchesSearchLocation = job => searchFilter.location === "" || job.location.toLowerCase().includes(searchFilter.location.toLowerCase())

        const newFilteredJobs = jobs.slice().reverse().filter(
            job => matchesCategory(job) && matchesLocation(job) && matchesTitle(job) && matchesSearchLocation(job)
        )

        setFilteredJobs(newFilteredJobs)
        setCurrentPage(1)
    }, [jobs, selectedCategories, selectedLocations, searchFilter])

    return (
        <div className='container px-4 sm:px-6 lg:px-8 xl:px-20 mx-auto flex flex-col lg:flex-row gap-8 py-10 sm:py-14'>

            {/* Sidebar */}
            <div className='w-full lg:w-1/4 shrink-0'>
                <div className='bg-white border border-slate-100 rounded-2xl p-6 sm:p-7 shadow-sm sticky top-24'>
                    
                    {/*  Search Filter from Hero Component */}
                    {
                        isSearched && (searchFilter.title !== "" || searchFilter.location !== "") && (
                            <div className='mb-6 pb-6 border-b border-slate-100'>
                                <h3 className='font-bold text-slate-800 text-sm tracking-wide uppercase mb-3'>
                                    Current Search
                                </h3>
                                <div className='flex flex-wrap gap-2'>
                                    {searchFilter.title && (
                                        <span className='inline-flex items-center gap-2 bg-indigo-50/80 border border-indigo-100 text-indigo-700 px-3.5 py-1.5 rounded-full text-xs font-semibold'>
                                            {searchFilter.title}
                                            <img onClick={e => setSearchFilter(prev => ({ ...prev, title: "" }))} className='cursor-pointer h-3.5 w-3.5 hover:scale-110 opacity-70 hover:opacity-100 transition-all' src={assets.cross_icon} alt="remove" />
                                        </span>
                                    )}
                                    {searchFilter.location && (
                                        <span className='inline-flex items-center gap-2 bg-violet-50/80 border border-violet-100 text-violet-700 px-3.5 py-1.5 rounded-full text-xs font-semibold'>
                                            {searchFilter.location}
                                            <img onClick={e => setSearchFilter(prev => ({ ...prev, location: "" }))} className='cursor-pointer h-3.5 w-3.5 hover:scale-110 opacity-70 hover:opacity-100 transition-all' src={assets.cross_icon} alt="remove" />
                                        </span>
                                    )}
                                </div>
                            </div>
                        )
                    }

                    <div className='flex items-center justify-between lg:mb-6'>
                        <h3 className='font-bold text-slate-800 text-base sm:text-lg tracking-tight max-lg:hidden'>
                            Filters
                        </h3>
                        <button onClick={e => setShowFilter(prev => !prev)} className='w-full lg:hidden flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold px-4 py-2.5 rounded-xl border border-slate-200 transition-all'>
                            {showFilter ? "Close Filters" : "Show Filters"}
                        </button>
                    </div>

                    <div className={`${showFilter ? "block" : "max-lg:hidden"} space-y-8 mt-6 lg:mt-0`}>
                        {/* Category Filter */}
                        <div>
                            <h4 className='font-bold text-slate-700 text-sm tracking-wider uppercase mb-4'>
                                Categories
                            </h4>
                            <ul className='space-y-3.5 text-slate-600'>
                                {
                                    JobCategories.map((category, index) => (
                                        <li className='flex gap-3 items-center group cursor-pointer' key={index}>
                                            <input
                                                className='h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500/30 accent-indigo-600 cursor-pointer transition-all'
                                                type="checkbox"
                                                id={`cat-${index}`}
                                                onChange={() => handleCategoryChange(category)}
                                                checked={selectedCategories.includes(category)}
                                            />
                                            <label htmlFor={`cat-${index}`} className='text-sm sm:text-base text-slate-600 group-hover:text-slate-800 transition-colors cursor-pointer select-none'>
                                                {category}
                                            </label>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>

                        {/* Location Filter */}
                        <div className='pt-6 border-t border-slate-100'>
                            <h4 className='font-bold text-slate-700 text-sm tracking-wider uppercase mb-4'>
                                Locations
                            </h4>
                            <ul className='space-y-3.5 text-slate-600'>
                                {
                                    JobLocations.map((location, index) => (
                                        <li className='flex gap-3 items-center group cursor-pointer' key={index}>
                                            <input
                                                className='h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500/30 accent-indigo-600 cursor-pointer transition-all'
                                                type="checkbox"
                                                id={`loc-${index}`}
                                                onChange={() => handleLocationChange(location)}
                                                checked={selectedLocations.includes(location)}
                                            />
                                            <label htmlFor={`loc-${index}`} className='text-sm sm:text-base text-slate-600 group-hover:text-slate-800 transition-colors cursor-pointer select-none'>
                                                {location}
                                            </label>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Job listings */}
            <section className='w-full lg:w-3/4 text-slate-800' id='job-list'>
                <div className='mb-8 max-lg:px-2'>
                    <h3 className='font-extrabold text-slate-850 text-2xl sm:text-3xl tracking-tight'>
                        Latest Openings
                    </h3>
                    <p className='text-slate-500 text-sm sm:text-base mt-1.5'>
                        Get your desired job from world-class tech companies
                    </p>
                </div>

                {filteredJobs.length === 0 ? (
                    <div className='bg-white border border-slate-100 rounded-2xl py-16 px-4 text-center shadow-sm'>
                        <p className='text-slate-400 font-medium text-lg'>No matching jobs found.</p>
                        <p className='text-slate-400 text-sm mt-1'>Try broadening your category or location filters.</p>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'>
                        {filteredJobs.slice((currentPage - 1) * 6, currentPage * 6).map((job, index) => (
                            <JobCard key={index} job={job} />
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {filteredJobs.length > 0 && (
                    <div className='flex items-center justify-center gap-2 mt-12 sm:mt-16'>
                        <a href="#job-list" className='hover:scale-105 active:scale-95 transition-all'>
                            <button 
                                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} 
                                disabled={currentPage === 1}
                                className='w-10 h-10 flex items-center justify-center border border-slate-200 bg-white hover:bg-slate-50 rounded-full disabled:opacity-40 disabled:hover:bg-white transition-all shadow-sm'
                            >
                                <img className='h-3 w-3 opacity-70' src={assets.left_arrow_icon} alt="previous" />
                            </button>
                        </a>
                        {Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map((_, index) => (
                            <a key={index} href="#job-list" className='hover:scale-105 active:scale-95 transition-all'>
                                <button 
                                    onClick={() => setCurrentPage(index + 1)} 
                                    className={`w-10 h-10 flex items-center justify-center rounded-full font-semibold text-sm transition-all shadow-sm ${currentPage === index + 1 ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-transparent' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                                >
                                    {index + 1}
                                </button>
                            </a>
                        ))}
                        <a href="#job-list" className='hover:scale-105 active:scale-95 transition-all'>
                            <button 
                                onClick={() => setCurrentPage(Math.min(currentPage + 1, Math.ceil(filteredJobs.length / 6)))} 
                                disabled={currentPage === Math.ceil(filteredJobs.length / 6)}
                                className='w-10 h-10 flex items-center justify-center border border-slate-200 bg-white hover:bg-slate-50 rounded-full disabled:opacity-40 disabled:hover:bg-white transition-all shadow-sm'
                            >
                                <img className='h-3 w-3 opacity-70' src={assets.right_arrow_icon} alt="next" />
                            </button>
                        </a>
                    </div>
                )}

            </section>

        </div>
    )
}

export default JobListing