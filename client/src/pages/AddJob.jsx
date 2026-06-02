import { useContext, useEffect, useRef, useState } from 'react'
import Quill from 'quill'
import { JobCategories, JobLocations } from '../assets/assets';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const AddJob = () => {

    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('Bangalore');
    const [category, setCategory] = useState('Programming');
    const [level, setLevel] = useState('Beginner level');
    const [salary, setSalary] = useState(0);

    const editorRef = useRef(null)
    const quillRef = useRef(null)

    const { backendUrl, companyToken } = useContext(AppContext)

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        try {

            const description = quillRef.current.root.innerHTML

            const { data } = await axios.post(backendUrl + '/api/company/post-job',
                { title, description, location, salary, category, level },
                { headers: { token: companyToken } }
            )

            if (data.success) {
                toast.success(data.message)
                setTitle('')
                setSalary(0)
                quillRef.current.root.innerHTML = ""
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }


    }


    useEffect(() => {
        // Initiate Qill only once
        if (!quillRef.current && editorRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                theme: 'snow',
            })
        }
    }, [])

    return (
        <form onSubmit={onSubmitHandler} className='bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col gap-6 w-full max-w-3xl transition-all duration-300 hover:shadow-indigo-500/5'>
            <div>
                <h2 className='text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight'>Post a New Job</h2>
                <p className='text-slate-400 text-sm mt-1'>Fill in the details to announce a new career opportunity.</p>
            </div>

            <div className='w-full'>
                <label className='block font-bold text-slate-700 text-xs tracking-wider uppercase mb-2'>
                    Job Title
                </label>
                <input 
                    type="text" 
                    placeholder='e.g. Senior Full Stack Engineer'
                    onChange={e => setTitle(e.target.value)} 
                    value={title}
                    required
                    className='w-full px-4 py-3 border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl outline-none text-slate-800 transition-all font-medium text-sm sm:text-base placeholder-slate-400'
                />
            </div>

            <div className='w-full'>
                <label className='block font-bold text-slate-700 text-xs tracking-wider uppercase mb-2'>
                    Job Description
                </label>
                <div className='border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-white min-h-[220px]'>
                    <div ref={editorRef} className='!border-0 text-slate-700'></div>
                </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 w-full'>
                <div>
                    <label className='block font-bold text-slate-700 text-xs tracking-wider uppercase mb-2'>
                        Job Category
                    </label>
                    <select 
                        className='w-full px-4 py-3 border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl outline-none text-slate-700 transition-all bg-white font-semibold text-sm cursor-pointer' 
                        onChange={e => setCategory(e.target.value)}
                        value={category}
                    >
                        {JobCategories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className='block font-bold text-slate-700 text-xs tracking-wider uppercase mb-2'>
                        Job Location
                    </label>
                    <select 
                        className='w-full px-4 py-3 border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl outline-none text-slate-700 transition-all bg-white font-semibold text-sm cursor-pointer' 
                        onChange={e => setLocation(e.target.value)}
                        value={location}
                    >
                        {JobLocations.map((location, index) => (
                            <option key={index} value={location}>{location}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className='block font-bold text-slate-700 text-xs tracking-wider uppercase mb-2'>
                        Job Level
                    </label>
                    <select 
                        className='w-full px-4 py-3 border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl outline-none text-slate-700 transition-all bg-white font-semibold text-sm cursor-pointer' 
                        onChange={e => setLevel(e.target.value)}
                        value={level}
                    >
                        <option value="Beginner level">Beginner level</option>
                        <option value="Intermediate level">Intermediate level</option>
                        <option value="Senior level">Senior level</option>
                    </select>
                </div>
            </div>

            <div>
                <label className='block font-bold text-slate-700 text-xs tracking-wider uppercase mb-2'>
                    Job Salary (Annual CTC in USD)
                </label>
                <input 
                    min={0} 
                    className='w-full sm:w-[220px] px-4 py-3 border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl outline-none text-slate-800 transition-all font-semibold text-sm placeholder-slate-450' 
                    onChange={e => setSalary(e.target.value)} 
                    value={salary}
                    type="Number" 
                    placeholder='e.g. 95000' 
                    required
                />
            </div>

            <button 
                type="submit"
                className='bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold py-3 px-8 rounded-xl shadow-md shadow-indigo-600/10 hover:shadow hover:scale-[1.02] active:scale-98 transition-all w-36 uppercase tracking-wider text-xs mt-2'
            >
                Post Job
            </button>
        </form>
    )
}

export default AddJob