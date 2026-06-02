import { useContext, useEffect, useState } from 'react'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../components/Loading'

const ManageJobs = () => {

  const navigate = useNavigate()

  const [jobs, setJobs] = useState(false)

  const { backendUrl, companyToken } = useContext(AppContext)

  // Function to fetch company Job Applications data 
  const fetchCompanyJobs = async () => {

    try {

      const { data } = await axios.get(backendUrl + '/api/company/list-jobs',
        { headers: { token: companyToken } }
      )

      if (data.success) {
        setJobs(data.jobsData.reverse())
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }

  }

  // Function to change Job Visibility 
  const changeJobVisiblity = async (id) => {

    try {

      const { data } = await axios.post(backendUrl + '/api/company/change-visiblity',
        { id },
        { headers: { token: companyToken } }
      )

      if (data.success) {
        toast.success(data.message)
        fetchCompanyJobs()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }

  }

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobs()
    }
  }, [companyToken])

  return jobs ? jobs.length === 0 ? (
    <div className='flex flex-col items-center justify-center h-[50vh] bg-white border border-slate-100 rounded-3xl p-8 text-center shadow-sm'>
      <p className='text-slate-400 font-bold text-lg'>No jobs posted yet.</p>
      <p className='text-slate-400 text-sm mt-1 mb-6'>Get started by listing your first opening!</p>
      <button 
        onClick={() => navigate('/dashboard/add-job')} 
        className='bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all active:scale-98 text-xs uppercase tracking-wider'
      >
        Add new job
      </button>
    </div>
  ) : (
    <div className='w-full max-w-5xl flex flex-col gap-6'>
      <div>
        <h2 className='text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight'>Manage Posted Jobs</h2>
        <p className='text-slate-400 text-sm mt-1'>Monitor active listings, application counts, and control search visibility.</p>
      </div>

      <div className='bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-slate-100'>
            <thead>
              <tr className='bg-slate-50/60'>
                <th className='py-4 px-6 text-slate-500 text-xs font-bold uppercase tracking-wider text-left border-b border-slate-100 max-sm:hidden'>#</th>
                <th className='py-4 px-6 text-slate-500 text-xs font-bold uppercase tracking-wider text-left border-b border-slate-100'>Job Title</th>
                <th className='py-4 px-6 text-slate-500 text-xs font-bold uppercase tracking-wider text-left border-b border-slate-100 max-sm:hidden'>Date Posted</th>
                <th className='py-4 px-6 text-slate-500 text-xs font-bold uppercase tracking-wider text-left border-b border-slate-100 max-sm:hidden'>Location</th>
                <th className='py-4 px-6 text-slate-500 text-xs font-bold uppercase tracking-wider text-center border-b border-slate-100'>Applicants</th>
                <th className='py-4 px-6 text-slate-500 text-xs font-bold uppercase tracking-wider text-center border-b border-slate-100'>Visible</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-slate-100 bg-white'>
              {jobs.map((job, index) => (
                <tr key={index} className='hover:bg-slate-50/30 transition-colors duration-150'>
                  <td className='py-4.5 px-6 text-slate-400 text-sm font-semibold border-b max-sm:hidden'>{index + 1}</td>
                  <td className='py-4.5 px-6 text-slate-800 text-sm sm:text-base font-bold border-b'>{job.title}</td>
                  <td className='py-4.5 px-6 text-slate-500 text-sm border-b max-sm:hidden'>{moment(job.date).format('ll')}</td>
                  <td className='py-4.5 px-6 text-slate-500 text-sm border-b max-sm:hidden'>{job.location}</td>
                  <td className='py-4.5 px-6 border-b text-center'>
                    <span className='inline-block px-3 py-1 bg-indigo-50 text-indigo-650 border border-indigo-100/50 rounded-full text-xs font-extrabold'>
                      {job.applicants}
                    </span>
                  </td>
                  <td className='py-4.5 px-6 border-b text-center'>
                    <input 
                      onChange={() => changeJobVisiblity(job._id)} 
                      className='h-4.5 w-4.5 rounded border-slate-350 text-indigo-600 focus:ring-indigo-500/30 accent-indigo-600 cursor-pointer transition-all' 
                      type="checkbox" 
                      checked={job.visible} 
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className='flex justify-end'>
        <button 
          onClick={() => navigate('/dashboard/add-job')} 
          className='bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all active:scale-98 text-xs uppercase tracking-wider cursor-pointer'
        >
          Add new job
        </button>
      </div>
    </div>
  ) : <Loading />
}

export default ManageJobs