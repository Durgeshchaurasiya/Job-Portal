import { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const RecruiterLogin = () => {

    const navigate = useNavigate()

    const [state, setState] = useState('Login')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const [image, setImage] = useState(false)

    const [isTextDataSubmited, setIsTextDataSubmited] = useState(false)

    const { setShowRecruiterLogin, backendUrl, setCompanyToken, setCompanyData } = useContext(AppContext)

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        if (state == "Sign Up" && !isTextDataSubmited) {
            return setIsTextDataSubmited(true)
        }

        try {

            if (state === "Login") {

                const { data } = await axios.post(backendUrl + '/api/company/login', { email, password })

                if (data.success) {
                    setCompanyData(data.company)
                    setCompanyToken(data.token)
                    localStorage.setItem('companyToken', data.token)
                    setShowRecruiterLogin(false)
                    navigate('/dashboard')
                } else {
                    toast.error(data.message)
                }

            } else {

                const formData = new FormData()
                formData.append('name', name)
                formData.append('password', password)
                formData.append('email', email)
                formData.append('image', image)

                const { data } = await axios.post(backendUrl + '/api/company/register', formData)

                if (data.success) {
                    setCompanyData(data.company)
                    setCompanyToken(data.token)
                    localStorage.setItem('companyToken', data.token)
                    setShowRecruiterLogin(false)
                    navigate('/dashboard')
                } else {
                    toast.error(data.message)
                }

            }

        } catch (error) {
            toast.error(error.message)
        }

    }

    useEffect(() => {
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [])

    return (
        <div className='fixed inset-0 z-50 backdrop-blur-md bg-slate-950/45 flex justify-center items-center p-4 transition-all duration-300'>
            <form onSubmit={onSubmitHandler} className='relative bg-white p-8 sm:p-10 rounded-2xl text-slate-650 w-full max-w-[400px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 flex flex-col gap-1 items-stretch transform transition-all duration-300 scale-100'>
                {/* Close Button */}
                <button 
                    type="button" 
                    onClick={() => setShowRecruiterLogin(false)} 
                    className='absolute top-4 right-4 h-7 w-7 flex items-center justify-center rounded-full hover:bg-slate-50 active:scale-90 transition-all cursor-pointer'
                >
                    <img className='h-3 w-3 opacity-50 hover:opacity-100' src={assets.cross_icon} alt="close" />
                </button>

                {/* Centered Brand Header matching Clerk */}
                <div className='flex flex-col items-center mb-6 text-center'>
                    <img 
                        onClick={() => navigate('/')} 
                        className='h-8 mb-4 cursor-pointer hover:opacity-90 transition-opacity' 
                        src={assets.logo} 
                        alt="Brand Logo" 
                    />
                    <h1 className='text-xl font-bold text-slate-800 tracking-tight'>
                        {state === 'Login' ? 'Sign in as Recruiter' : 'Create Recruiter Account'}
                    </h1>
                    <p className='text-xs text-slate-400 mt-1.5 px-2 leading-relaxed'>
                        {state === 'Login' ? 'to access your employer dashboard and post open roles' : 'to start matching with global talent'}
                    </p>
                </div>

                {state === "Sign Up" && isTextDataSubmited
                    ? <>
                        <div className='flex flex-col items-center justify-center gap-4 my-6 p-6 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50 hover:bg-slate-50 transition-all group'>
                            <label htmlFor="image" className='cursor-pointer flex flex-col items-center justify-center'>
                                <div className='relative h-20 w-20 rounded-full border border-slate-200 shadow-sm overflow-hidden bg-white flex items-center justify-center group-hover:scale-105 transition-all duration-300'>
                                    <img className={image ? 'h-full w-full object-cover' : 'h-8 w-8 opacity-45 object-contain'} src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                                </div>
                                <input onChange={e => setImage(e.target.files[0])} type="file" id='image' hidden />
                                <span className='text-xs font-bold text-indigo-650 hover:text-indigo-550 transition-colors mt-3'>
                                    Select Logo File
                                </span>
                            </label>
                            <p className='text-[10px] text-slate-400 text-center leading-relaxed mt-1'>
                                Support for PNG, JPG, or SVG. Maximum file size 2MB.
                            </p>
                        </div>
                    </>
                    : <div className='space-y-4'>

                        {state !== 'Login' && (
                            <div className='flex flex-col gap-1.5'>
                                <label className='text-xs font-bold text-slate-500 uppercase tracking-wider'>Company Name</label>
                                <input 
                                    className='w-full px-3.5 py-2.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-100/50 rounded-xl outline-none text-slate-800 text-sm font-medium transition-all placeholder-slate-400' 
                                    onChange={e => setName(e.target.value)} 
                                    value={name} 
                                    type="text" 
                                    placeholder='e.g. Acme Corp' 
                                    required 
                                />
                            </div>
                        )}

                        <div className='flex flex-col gap-1.5'>
                            <label className='text-xs font-bold text-slate-500 uppercase tracking-wider'>Email Address</label>
                            <input 
                                className='w-full px-3.5 py-2.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-100/50 rounded-xl outline-none text-slate-800 text-sm font-medium transition-all placeholder-slate-400' 
                                onChange={e => setEmail(e.target.value)} 
                                value={email} 
                                type="email" 
                                placeholder='you@company.com' 
                                required 
                            />
                        </div>

                        <div className='flex flex-col gap-1.5'>
                            <div className='flex justify-between items-center'>
                                <label className='text-xs font-bold text-slate-500 uppercase tracking-wider'>Password</label>
                                {state === "Login" && (
                                    <span className='text-[11px] font-bold text-indigo-600 hover:text-indigo-500 transition-colors cursor-pointer'>
                                        Forgot?
                                    </span>
                                )}
                            </div>
                            <input 
                                className='w-full px-3.5 py-2.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-100/50 rounded-xl outline-none text-slate-800 text-sm font-medium transition-all placeholder-slate-400' 
                                onChange={e => setPassword(e.target.value)} 
                                value={password} 
                                type="password" 
                                placeholder='••••••••' 
                                required 
                            />
                        </div>
                    </div>}

                <button 
                    type='submit' 
                    className='w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 rounded-xl shadow-sm hover:shadow active:scale-[0.99] transition-all mt-6 uppercase tracking-wider text-xs'
                >
                    {state === 'Login' ? 'Continue' : isTextDataSubmited ? 'Create Account' : 'Continue'}
                </button>

                {
                    state === 'Login'
                        ? <p className='mt-5 text-center text-xs text-slate-400'>
                            Don't have a recruiter account? <span className='text-indigo-600 hover:text-indigo-500 font-bold transition-all cursor-pointer' onClick={() => setState("Sign Up")}>Sign Up</span>
                          </p>
                        : <p className='mt-5 text-center text-xs text-slate-400'>
                            Already registered? <span className='text-indigo-600 hover:text-indigo-500 font-bold transition-all cursor-pointer' onClick={() => setState("Login")}>Login</span>
                          </p>
                }
            </form>
        </div>
    )
}

export default RecruiterLogin