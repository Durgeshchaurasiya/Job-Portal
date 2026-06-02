import { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { assets } from '../assets/assets'
import moment from 'moment'
import Footer from '../components/Footer'
import { AppContext } from '../context/AppContext'
import { useAuth, useUser } from '@clerk/clerk-react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../components/Loading'

const Applications = () => {

  const { user } = useUser()
  const { getToken } = useAuth()

  const [isEdit, setIsEdit] = useState(false)
  const [resume, setResume] = useState(null)

  const { backendUrl, userData, userApplications, fetchUserData, fetchUserApplications } = useContext(AppContext)

  const updateResume = async () => {

    try {

      const formData = new FormData()
      formData.append('resume', resume)

      const token = await getToken()

      const { data } = await axios.post(backendUrl + '/api/users/update-resume',
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (data.success) {
        toast.success(data.message)
        await fetchUserData()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }

    setIsEdit(false)
    setResume(null)
  }

  useEffect(() => {
    if (user) {
      fetchUserApplications()
    }
  }, [user])

  return userData ? (
    <>
      <Navbar />
      
      <div className='container px-4 sm:px-6 lg:px-8 xl:px-20 mx-auto my-10 sm:my-16 min-h-[70vh]'>
        
        {/* Your Resume Card Section */}
        <div className='bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-300 hover:shadow-indigo-500/5'>
          <div>
            <h2 className='text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight'>Candidate Resume</h2>
            <p className='text-slate-400 text-sm mt-1.5'>
              Keep your resume updated to ensure the best response rate from hiring companies.
            </p>
          </div>
          <div className='flex items-center gap-3 shrink-0'>
            {
              isEdit || (userData && userData.resume === "")
                ? <div className='flex items-center gap-3 w-full sm:w-auto'>
                  <label className='flex items-center cursor-pointer' htmlFor="resumeUpload">
                    <span className='bg-indigo-50 hover:bg-indigo-100/80 text-indigo-600 font-semibold px-5 py-2.5 rounded-xl border border-indigo-100 mr-3 text-sm transition-all flex items-center gap-2'>
                      {resume ? resume.name : "Select PDF File"}
                      <img className='h-4 w-4 opacity-75' src={assets.profile_upload_icon} alt="" />
                    </span>
                    <input id='resumeUpload' onChange={e => setResume(e.target.files[0])} accept='application/pdf' type="file" hidden />
                  </label>
                  <button 
                    onClick={updateResume} 
                    disabled={!resume}
                    className='bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:hover:bg-emerald-600 text-white font-semibold px-6 py-2.5 rounded-xl shadow-sm hover:shadow text-sm active:scale-97 transition-all cursor-pointer'
                  >
                    Save
                  </button>
                  {userData && userData.resume !== "" && (
                    <button 
                      onClick={() => setIsEdit(false)} 
                      className='text-slate-400 hover:text-slate-600 bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-medium transition-all'
                    >
                      Cancel
                    </button>
                  )}
                </div>
                : <div className='flex items-center gap-3'>
                  <a 
                    target='_blank' 
                    rel="noreferrer"
                    href={userData.resume} 
                    className='bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold px-6 py-2.5 rounded-xl shadow-sm hover:shadow transition-all text-sm hover:scale-[1.02] active:scale-98'
                  >
                    View Resume
                  </a>
                  <button 
                    onClick={() => setIsEdit(true)} 
                    className='text-slate-500 hover:text-slate-700 hover:bg-slate-50 border border-slate-200 rounded-xl px-5 py-2.5 font-medium transition-all text-sm'
                  >
                    Edit
                  </button>
                </div>
            }
          </div>
        </div>

        {/* Jobs Applied Table Container */}
        <div>
          <h2 className='text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight mb-5 px-1'>
            Jobs Applied
          </h2>
          
          <div className='bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden'>
            <div className='overflow-x-auto'>
              <table className='min-w-full division-y division-slate-100'>
                <thead>
                  <tr className='bg-slate-50/60'>
                    <th className='py-4 px-6 text-slate-500 text-xs font-bold uppercase tracking-wider text-left border-b border-slate-100'>Company</th>
                    <th className='py-4 px-6 text-slate-500 text-xs font-bold uppercase tracking-wider text-left border-b border-slate-100'>Job Title</th>
                    <th className='py-4 px-6 text-slate-500 text-xs font-bold uppercase tracking-wider text-left border-b border-slate-100 max-sm:hidden'>Location</th>
                    <th className='py-4 px-6 text-slate-500 text-xs font-bold uppercase tracking-wider text-left border-b border-slate-100 max-sm:hidden'>Date Applied</th>
                    <th className='py-4 px-6 text-slate-500 text-xs font-bold uppercase tracking-wider text-left border-b border-slate-100'>Status</th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-slate-100 bg-white'>
                  {userApplications.map((job, index) => job.jobId ? (
                    <tr key={index} className='hover:bg-slate-50/30 transition-colors duration-150'>
                      <td className='py-4.5 px-6 flex items-center gap-3'>
                        <div className='h-8 w-8 p-1 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center overflow-hidden shrink-0'>
                          <img className='h-full w-full object-contain' src={job.companyId.image} alt={job.companyId.name} />
                        </div>
                        <span className='font-bold text-slate-800 text-sm sm:text-base'>{job.companyId.name}</span>
                      </td>
                      <td className='py-4 px-6 text-slate-700 text-sm sm:text-base font-semibold'>{job.jobId.title}</td>
                      <td className='py-4 px-6 text-slate-500 text-sm max-sm:hidden'>{job.jobId.location}</td>
                      <td className='py-4 px-6 text-slate-500 text-sm max-sm:hidden'>{moment(job.date).format('ll')}</td>
                      <td className='py-4 px-6'>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wide ${job.status === 'Accepted' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100/50' : job.status === 'Rejected' ? 'bg-rose-50 text-rose-600 border border-rose-100/50' : 'bg-amber-50 text-amber-600 border border-amber-100/50'}`}>
                          {job.status}
                        </span>
                      </td>
                    </tr>
                  ) : null)}

                  {userApplications.length === 0 && (
                    <tr>
                      <td colSpan={5} className='py-16 text-center text-slate-400 font-medium'>
                        You haven't applied for any jobs yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </>
  ) : <Loading />
}

export default Applications