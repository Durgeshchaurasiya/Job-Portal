import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import Loading from '../components/Loading'
import Navbar from '../components/Navbar'
import { assets } from '../assets/assets'
import kconvert from 'k-convert';
import moment from 'moment';
import JobCard from '../components/JobCard'
import Footer from '../components/Footer'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useAuth } from '@clerk/clerk-react'

const ApplyJob = () => {

  const { id } = useParams()

  const { getToken } = useAuth()

  const navigate = useNavigate()

  const [JobData, setJobData] = useState(null)
  const [isAlreadyApplied, setIsAlreadyApplied] = useState(false)

  const { jobs, backendUrl, userData, userApplications, fetchUserApplications } = useContext(AppContext)

  const fetchJob = async () => {

    try {

      const { data } = await axios.get(backendUrl + `/api/jobs/${id}`)

      if (data.success) {
        setJobData(data.job)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }

  }

  const applyHandler = async () => {
    try {

      if (!userData) {
        return toast.error('Login to apply for jobs')
      }

      if (!userData.resume) {
        navigate('/applications')
        return toast.error('Upload resume to apply')
      }

      const token = await getToken()

      const { data } = await axios.post(backendUrl + '/api/users/apply',
        { jobId: JobData._id },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (data.success) {
        toast.success(data.message)
        fetchUserApplications()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  const checkAlreadyApplied = () => {

    const hasApplied = userApplications.some(item => item.jobId._id === JobData._id)
    setIsAlreadyApplied(hasApplied)

  }

  useEffect(() => {
    fetchJob()
  }, [id])

  useEffect(() => {
    if (userApplications.length > 0 && JobData) {
      checkAlreadyApplied()
    }
  }, [JobData, userApplications, id])

  return JobData ? (
    <>
      <Navbar />

      <div className='min-h-screen py-8 sm:py-12 container px-4 sm:px-6 lg:px-8 xl:px-20 mx-auto'>
        <div className='w-full'>
          {/* Stunning light mesh card header */}
          <div className='flex justify-between items-center flex-wrap gap-8 p-8 sm:p-12 mb-8 bg-gradient-to-br from-indigo-50/60 via-violet-50/50 to-slate-50/40 border border-indigo-100 shadow-sm rounded-3xl relative overflow-hidden'>
            <div className='absolute top-0 right-0 w-80 h-80 bg-white/20 rounded-full translate-x-1/3 -translate-y-1/3 -z-10 border border-white/30'></div>
            
            <div className='flex flex-col md:flex-row items-center gap-6'>
              <div className='h-20 w-20 p-2 bg-white rounded-2xl border border-slate-150/80 shadow-sm flex items-center justify-center overflow-hidden shrink-0'>
                <img className='h-full w-full object-contain' src={JobData.companyId.image} alt="" />
              </div>
              
              <div className='text-center md:text-left'>
                <h1 className='text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-800 tracking-tight'>{JobData.title}</h1>
                <div className='flex flex-wrap max-md:justify-center gap-x-6 gap-y-2.5 items-center text-slate-550 mt-3.5 text-xs sm:text-sm font-semibold'>
                  <span className='flex items-center gap-1.5'>
                    <img className='h-4 w-4 opacity-60' src={assets.suitcase_icon} alt="" />
                    {JobData.companyId.name}
                  </span>
                  <span className='flex items-center gap-1.5'>
                    <img className='h-4 w-4 opacity-60' src={assets.location_icon} alt="" />
                    {JobData.location}
                  </span>
                  <span className='flex items-center gap-1.5'>
                    <img className='h-4 w-4 opacity-60' src={assets.person_icon} alt="" />
                    {JobData.level}
                  </span>
                  <span className='flex items-center gap-1.5 bg-emerald-50 text-emerald-600 border border-emerald-100/50 px-3 py-1 rounded-full text-xs font-bold'>
                    <img className='h-3.5 w-3.5 opacity-80' src={assets.money_icon} alt="" />
                    CTC: {kconvert.convertTo(JobData.salary)}
                  </span>
                </div>
              </div>
            </div>

            <div className='flex flex-col justify-center text-right max-md:mx-auto max-md:text-center shrink-0'>
              <button 
                onClick={applyHandler} 
                className='bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold py-3 px-10 rounded-xl transition-all shadow-md shadow-indigo-600/10 hover:shadow-indigo-500/20 active:scale-98'
              >
                {isAlreadyApplied ? 'Already Applied' : 'Apply Now'}
              </button>
              <p className='mt-2.5 text-xs sm:text-sm font-medium text-slate-400'>
                Posted {moment(JobData.date).fromNow()}
              </p>
            </div>
          </div>

          <div className='flex flex-col lg:flex-row justify-between items-start gap-8'>
            <div className='w-full lg:w-2/3 bg-white border border-slate-100 rounded-3xl p-6 sm:p-10 shadow-sm'>
              <h2 className='font-extrabold text-slate-800 text-xl sm:text-2xl mb-6 pb-3 border-b border-slate-100'>
                Job Description
              </h2>
              <div className='rich-text mb-8' dangerouslySetInnerHTML={{ __html: JobData.description }}></div>
              <button 
                onClick={applyHandler} 
                className='bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold py-3.5 px-12 rounded-xl transition-all shadow-md shadow-indigo-600/10 hover:shadow-indigo-500/20 active:scale-98'
              >
                {isAlreadyApplied ? 'Already Applied' : 'Apply Now'}
              </button>
            </div>

            {/* Right Section More Jobs */}
            <div className='w-full lg:w-1/3 space-y-6'>
              <div className='bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm'>
                <h3 className='font-bold text-slate-850 text-base sm:text-lg mb-5 pb-3 border-b border-slate-100 uppercase tracking-wider text-slate-700'>
                  More from {JobData.companyId.name}
                </h3>
                <div className='space-y-4'>
                  {jobs.filter(job => job._id !== JobData._id && job.companyId._id === JobData.companyId._id)
                    .filter(job => {
                      const appliedJobsIds = new Set(userApplications.map(app => app.jobId && app.jobId._id))
                      return !appliedJobsIds.has(job._id)
                    }).slice(0, 3)
                    .map((job, index) => <JobCard key={index} job={job} />)}
                  {jobs.filter(job => job._id !== JobData._id && job.companyId._id === JobData.companyId._id)
                    .filter(job => {
                      const appliedJobsIds = new Set(userApplications.map(app => app.jobId && app.jobId._id))
                      return !appliedJobsIds.has(job._id)
                    }).length === 0 && (
                      <p className='text-xs sm:text-sm text-slate-400 font-medium text-center py-4'>
                        No other listings available.
                      </p>
                    )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Loading />
  )
}

export default ApplyJob