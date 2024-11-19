import {Link, useNavigate} from 'react-router-dom'
import {useLogout} from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { useState } from 'react'


const Navbar = () =>{
    const {user} = useAuthContext()
    const{logout} = useLogout()
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()

    const handleClick = () =>{
        logout()
        navigate('login-student')
    }

    const handleOpen = () =>{
        setIsOpen(isOpen ? false : true)
    }
    
    return (
       <header className='py-4 bg-white px-8'>
            <div className="flex justify-between items-center">
                <Link to="/">
                    <h1 className="text-xl font-black tracking-tight">Course Manager</h1>
                </Link>
                {user && (
                    <div className=''>
                        <div className="relative inline-block text-left lg:hidden">
                            <div>
                                <button className="inline-flex w-full justify-center px-3 py-2 text-sm font-semibold text-gray-900" id="menu-button" aria-expanded="true" aria-haspopup="true"
                                onClick={handleOpen}>
                                    {user.srcode}
                                    <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                            <div className={`absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${!isOpen && 'hidden'} p-3 flex justify-end`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                <div className="py-1" role="none">
                                    <button className="py-1 px-2 border-2 border-red-700 rounded-xl text-red-700 hover:bg-red-700 hover:text-gray-100" onClick={handleClick}>Logout</button>
                                </div>
                            </div>
                        </div>
                        <div className="hidden justify-evenly items-center lg:flex">
                            <p className='me-2'>{user.srcode}</p>
                            <button className="py-1 px-2 border-2 border-red-700 rounded-xl text-red-700 hover:bg-red-700 hover:text-gray-100 transitiom delay-50 ease-in-out duration-300" onClick={handleClick}>Logout</button>
                        </div>
                    </div>
                )}    
                {!user && (
                <div className='flex justify-evenly items-center'>
                    <Link to="/register-student" className='me-2'>
                        <p className="">Register</p>
                    </Link>
                    <Link to="/login-student">
                        <p className="py-1 px-2 border-2 border-red-700 rounded-xl text-red-700 hover:bg-red-700 hover:text-gray-100 transitiom delay-50 ease-in-out duration-300">Login</p>
                    </Link>
                </div>
                )}
            </div>
       </header>
    )
}

export default Navbar