import { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../components/Loading'

const ViewApplications = () => {

  const { backendUrl, companyToken } = useContext(AppContext)

  const [applicants, setApplicants] = useState(false)

  // Function to fetch company Job Applications data 
  const fetchCompanyJobApplications = async () => {

    try {

      const { data } = await axios.get(backendUrl + '/api/company/applicants',
        { headers: { token: companyToken } }
      )

      if (data.success) {
        setApplicants(data.applications.reverse())
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }

  }

  // Function to Update Job Applications Status 
  const changeJobApplicationStatus = async (id, status) => {
    try {

      const { data } = await axios.post(backendUrl + '/api/company/change-status',
        { id, status },
        { headers: { token: companyToken } }
      )

      if (data.success) {
        fetchCompanyJobApplications()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobApplications()
    }
  }, [companyToken])

  return applicants ? applicants.length === 0 ? (
    <div className='flex flex-col items-center justify-center h-[50vh] bg-white border border-slate-100 rounded-3xl p-8 text-center shadow-sm'>
      <p className='text-slate-400 font-bold text-lg'>No applications received yet.</p>
      <p className='text-slate-400 text-sm mt-1'>Check back later as candidates discover your listings!</p>
    </div>
  ) : (
    <div className='w-full max-w-5xl flex flex-col gap-6'>
      <div>
        <h2 className='text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight'>Manage Candidates</h2>
        <p className='text-slate-400 text-sm mt-1'>Inspect applicant profiles, resumes, and approve or reject submissions.</p>
      </div>

      <div className='bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-slate-100'>
            <thead>
              <tr className='bg-slate-50/60'>
                <th className='py-4 px-6 text-slate-500 text-xs font-bold uppercase tracking-wider text-left border-b border-slate-100 max-sm:hidden'>#</th>
                <th className='py-4 px-6 text-slate-500 text-xs font-bold uppercase tracking-wider text-left border-b border-slate-100'>Candidate Name</th>
                <th className='py-4 px-6 text-slate-500 text-xs font-bold uppercase tracking-wider text-left border-b border-slate-100 max-sm:hidden'>Applied Job</th>
                <th className='py-4 px-6 text-slate-500 text-xs font-bold uppercase tracking-wider text-left border-b border-slate-100 max-sm:hidden'>Location</th>
                <th className='py-4 px-6 text-slate-500 text-xs font-bold uppercase tracking-wider text-left border-b border-slate-100'>Resume</th>
                <th className='py-4 px-6 text-slate-500 text-xs font-bold uppercase tracking-wider text-left border-b border-slate-100'>Action</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-slate-100 bg-white'>
              {applicants.filter(item => item.jobId && item.userId).map((applicant, index) => (
                <tr key={index} className='hover:bg-slate-50/30 transition-colors duration-150'>
                  <td className='py-4.5 px-6 text-slate-400 text-sm font-semibold border-b max-sm:hidden'>{index + 1}</td>
                  
                  <td className='py-4.5 px-6 border-b'>
                    <div className='flex items-center gap-3'>
                      <div className='h-9 w-9 p-0.5 bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center overflow-hidden shrink-0 max-sm:hidden'>
                        <img className='h-full w-full rounded-full object-cover' src={applicant.userId.image} alt={applicant.userId.name} />
                      </div>
                      <span className='font-bold text-slate-800 text-sm sm:text-base'>{applicant.userId.name}</span>
                    </div>
                  </td>

                  <td className='py-4.5 px-6 text-slate-700 text-sm sm:text-base font-semibold border-b max-sm:hidden'>{applicant.jobId.title}</td>
                  <td className='py-4.5 px-6 text-slate-500 text-sm border-b max-sm:hidden'>{applicant.jobId.location}</td>
                  
                  <td className='py-4.5 px-6 border-b'>
                    <a 
                      href={applicant.userId.resume} 
                      target='_blank'
                      rel="noreferrer"
                      className='bg-indigo-50 hover:bg-indigo-100/80 text-indigo-650 px-3.5 py-1.5 rounded-full inline-flex gap-2 items-center text-xs font-extrabold transition-all shadow-sm'
                    >
                      Resume 
                      <img className='h-3 w-3 opacity-80' src={assets.resume_download_icon} alt="" />
                    </a>
                  </td>

                  <td className='py-4.5 px-6 border-b'>
                    {applicant.status === "Pending" ? (
                      <div className='flex items-center gap-2'>
                        <button 
                          onClick={() => changeJobApplicationStatus(applicant._id, 'Accepted')} 
                          className='bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-600 border border-emerald-100/50 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer'
                        >
                          Accept
                        </button>
                        <button 
                          onClick={() => changeJobApplicationStatus(applicant._id, 'Rejected')} 
                          className='bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-600 border border-rose-100/50 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer'
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wide ${applicant.status === 'Accepted' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100/50' : 'bg-rose-50 text-rose-600 border border-rose-100/50'}`}>
                        {applicant.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : <Loading />
}

export default ViewApplications