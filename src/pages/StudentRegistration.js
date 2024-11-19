import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { useRegister } from '../hooks/useRegister'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Loading from '../components/Loading'
import Error from '../components/Error'

const StudentRegistration = () =>{

    const [srcode, setSrcode] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [year, setYear] = useState('')
    const [course, setCourse] = useState('')
    const [section, setSection] = useState('')
    const {registerStudent, isLoading, error} = useRegister()

    //Password and Confirm Password icon
    const [isVisible, setVisible] = useState(false)
    const [isVisibleConfirm, setVisibleConfirm] = useState(false)
    const [isMatch, setIsmatch] = useState(null)

    //Next Button validation
    const [isNext, setIsNext] = useState(false)

    //Register button validation

    const[isComplete, setIsComplete] = useState(false)
    console.log(isComplete)

    //Srcode validation
    const [isvalidSrcode, setIsValidSrcode] = useState(null)
    const regex = /^[0-9]{2}-[0-9]{5}$/

    //Form changing
    const [firstForm, setFirstForm] = useState('block')
    const [secondForm, setSecondForm] = useState('hidden')

    //Next button validation
    useEffect(() =>{
        const isEmpty = (value) =>{
            if(value === ''){
                return true
            }
    
            return false
        }

        const firstFormFields = ![srcode, name, password, confirmPassword ].some(isEmpty) 
        const passwordmatch = password === confirmPassword

        setIsNext(firstFormFields && passwordmatch ? true : false)
    }, [srcode, name, password, confirmPassword])

    useEffect(() =>{
        const isEmpty = (value) =>{
            if(value === ''){
                return true
            }
    
            return false
        }

        const secondFormFields = ![year, course, section].some(isEmpty) 
        setIsComplete(secondFormFields ? true : false)
    }, [year, course, section])

    const toggleNext = () =>{ 
        if(firstForm === 'block'){
        setFirstForm('hidden')
        setSecondForm('block')
       }else{
        setSecondForm('hidden')
        setFirstForm('block')
       }
    }

    const handleSubmit = async(e) =>{
        e.preventDefault()

        await registerStudent({srcode, password, name, year, course, section, userLevel: 2})

        if(!error){
            setSrcode('')
            setName('')
            setPassword('')
            setConfirmPassword('')
            setYear('')
            setCourse('')
            setSection('')
        }else{
            console.log(error)
        }
    }

    const handleSeePassword = () =>{
        setVisible(isVisible ? false : true)
    }

    const handleSeePasswordConfirm = () =>{
        setVisibleConfirm(isVisibleConfirm ? false : true)
    }


    return(

        <section className="relative mx-10 my-10 lg:fixed lg:my-0 lg:mx-0 flex top-26 lg:left-80">
            {isLoading && <Loading/>}
            <div className="hidden lg:block bg-red-700 w-96 text-center py-44 px-6 rounded-s-2xl">
                <h1 className="text-2xl font-semibold mb-3 text-gray-100">Come Join Us</h1>
                <p className="font-thin text-gray-200 mb-5">
                    We are so excited to have you here. 
                    If you haven't already create an account to get access to exclusive offers, rewards and discounts.
                </p>

                <p className="text-gray-100 font-thin">
                    Already have an account?
                    <Link to= '/login-student' className="underline underline-offset-3 ms-1">
                        Log in here
                    </Link>
                </p>
            </div>

            <div className="bg-rose-200 w-96 rounded-2xl py-10 lg:py-10 lg:rounded-s-none lg:rounded-e-2xl px-3">
                <h1 className="text-3xl text-center font-black">Register</h1>
                <form onSubmit={handleSubmit} className="px-4 mt-4">
                    <div className={firstForm}>
                        <div className="mb-3">
                            <label htmlFor="srcode" className="text-md">Srcode</label>
                            <input 
                                type="text" 
                                name="srcode" 
                                id="srcode"
                                className= 'text-field border-gray-300'
                                placeholder='ex. 12-34567'
                                onChange={(e) => {
                                    setSrcode(e.target.value) 
                                    setIsValidSrcode(regex.test(e.target.value) ? true : false)
                                    }
                                }
                                value={srcode}
                            />
                            {!isvalidSrcode && <div className='text-red-600'>*Invalid Srcode</div>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="name" className="text-md">Name</label>
                            <input 
                                type="text" 
                                name="name" 
                                id="name"
                                className="text-field border-gray-300"
                                placeholder='ex. Dela Cruz Juan D.'
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />
                        </div>

                        <div className="mb-3 relative">
                            <label htmlFor="password" className="text-md">Password</label>
                            <input 
                                type={isVisible ? 'text' : 'password'} 
                                name="password" 
                                id="password"
                                className="text-field border-gray-300 pr-24"
                                placeholder='Password must be 8 characters long'
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                            <div className='absolute inset-y-0 right-0 pr-2 mt-6 flex items-center cursor-pointer'
                                onClick={handleSeePassword}>
                                {isVisible ? <VisibilityIcon className='text-gray-800' /> : <VisibilityOffIcon className='text-gray-800' />}
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="text-md">Confirm Password</label>
                            <div className='relative'>
                                <input 
                                    type={isVisibleConfirm ? 'text' : 'password'}  
                                    name="confirmPassword" 
                                    id="confirmPassword"
                                    className="text-field border-gray-300"
                                    placeholder='Password must be 8 characters long'
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value)
                                        setIsmatch(e.target.value === password ? true : false)
                                        }
                                    }
                                    value={confirmPassword}
                                />
                                <div className='absolute inset-y-0 right-0 pr-2 flex items-center cursor-pointer'
                                    onClick={handleSeePasswordConfirm}>
                                    {isVisibleConfirm ? <VisibilityIcon className='text-gray-800' /> : <VisibilityOffIcon className='text-gray-800' />}
                                </div>
                            </div>
                            <div className='text-red-600'>{isMatch && confirmPassword !== '' ? '': '*Password doeas not match'}</div>
                        </div>
                        <div className='flex justify-center'>
                            <span className={`btn text-gray-100 text-center ${isNext ? 'bg-gray-800 hover:bg-gray-900':'pointer-events-none bg-gray-700'}`} onClick={()=> toggleNext()}>Next</span>
                        </div>
                    </div>
                    <div className={secondForm}>
                        <div className="mb-3">
                            <label htmlFor="year" className="text-md">Year</label>
                            <input 
                                type="text" 
                                name="year" 
                                id="year"
                                className="text-field border-gray-300"
                                placeholder='ex. 1 for Firts Year, 2 for Second Year..'
                                onChange={(e) => setYear(e.target.value)}
                                value={year}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="course" className="text-md">Course</label>
                            <input 
                                type="text" 
                                name="course" 
                                id="course"
                                className="text-field border-gray-300"
                                placeholder='ex. BSIT'
                                onChange={(e) => setCourse(e.target.value)}
                                value={course}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="section" className="text-md">Section</label>
                            <input 
                                type="text" 
                                name="section" 
                                id="section"
                                className="text-field border-gray-300"
                                placeholder='Exact Section in your portal'
                                onChange={(e) => setSection(e.target.value)}
                                value={section}
                            />
                        </div>
                        <div className='flex mb-2'>
                            <span className="btn bg-gray-800 hover:bg-gray-900 text-gray-100 text-center" onClick={()=> toggleNext()}>Go Back</span>
                        </div>
                        <button disabled={isComplete} 
                        className={`btn text-gray-100 ${isComplete ? 'bg-red-700 hover:bg-red-800' : 'bg-red-400 pointer-events-none'}`}>
                            Register
                        </button>
                    </div>

                    {error && <Error error={error}/>}
                </form>
            </div>
        </section>
    )
}

export default StudentRegistration