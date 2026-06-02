import { useNavigate } from 'react-router-dom'
import kconvert from 'k-convert'

const JobCard = ({ job }) => {

  const navigate = useNavigate()

  return (
    <div className='glass-card border border-slate-100 hover:border-indigo-100/70 p-6 sm:p-7 rounded-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between h-[380px] group relative overflow-hidden'>
      {/* Decorative top gradient accent bar on hover */}
      <div className='absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-500 transform -translate-y-1 group-hover:translate-y-0 transition-transform duration-300'></div>

      <div>
        <div className='flex justify-between items-center mb-4'>
          <div className='h-11 w-11 p-2 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center overflow-hidden shadow-sm group-hover:scale-105 transition-transform duration-300'>
            <img className='h-full w-full object-contain' src={job.companyId.image} alt={job.companyId.name} />
          </div>
          <span className='bg-emerald-50 text-emerald-600 border border-emerald-100/70 px-3 py-1 rounded-full text-xs font-semibold tracking-wide'>
            CTC: {kconvert.convertTo(job.salary)}
          </span>
        </div>

        <h4 className='font-bold text-slate-800 text-lg sm:text-xl line-clamp-1 group-hover:text-indigo-600 transition-colors mt-2'>
          {job.title}
        </h4>

        <div className='flex flex-wrap items-center gap-2 mt-3'>
          <span className='bg-indigo-50/70 text-indigo-600 border border-indigo-100/50 px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold tracking-wide uppercase'>
            {job.location}
          </span>
          <span className='bg-violet-50/70 text-violet-600 border border-violet-100/50 px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold tracking-wide uppercase'>
            {job.level}
          </span>
          <span className='bg-slate-50 text-slate-500 border border-slate-200/50 px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold tracking-wide uppercase'>
            {job.category}
          </span>
        </div>

        <p 
          className='text-slate-500 text-xs sm:text-sm mt-4 line-clamp-3 leading-relaxed' 
          dangerouslySetInnerHTML={{ __html: job.description }}
        ></p>
      </div>

      <div className='mt-6 flex items-center gap-3 w-full shrink-0'>
        <button 
          onClick={() => { navigate(`/apply-job/${job._id}`); scrollTo(0, 0) }} 
          className='flex-1 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs sm:text-sm font-semibold py-2.5 rounded-xl shadow-sm hover:shadow hover:scale-[1.02] active:scale-98 transition-all text-center'
        >
          Apply now
        </button>
        <button 
          onClick={() => { navigate(`/apply-job/${job._id}`); scrollTo(0, 0) }} 
          className='flex-1 text-slate-500 hover:text-slate-700 hover:bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium py-2.5 rounded-xl hover:scale-[1.02] active:scale-98 transition-all text-center'
        >
          Learn more
        </button>
      </div>
    </div>
  )
}

export default JobCard