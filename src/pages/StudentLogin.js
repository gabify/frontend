import { useState } from "react"
import {Link} from 'react-router-dom'
import Loading from '../components/Loading'
import Error from '../components/Error'
import {useLogin} from '../hooks/useLogin'


const StudentLogin = () =>{
    const [srcode, setSrcode] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()

    const handleSubmit = async(e) =>{
        e.preventDefault()

        await login(srcode, password)
        
        if(!error){
            setSrcode('')
            setPassword('')
        }else{
            console.log(error)
        }
    }
    
    
    return(
        <section className="relative mx-10 my-10 lg:fixed lg:my-0 lg:mx-0 flex top-26 lg:left-80">
            <div className="hidden lg:block bg-red-700 w-96 text-center py-44 px-6 rounded-s-2xl">
                <h1 className="text-2xl font-semibold mb-3 text-gray-100">Come Join Us</h1>
                <p className="font-thin text-gray-200 mb-5">
                    We are so excited to have you here. 
                    If you haven't already create an account to get access to exclusive offers, rewards and discounts.
                </p>

                <p className="text-gray-100 font-thin">
                    No account yet? 
                    <Link to= '/register-student' className="underline underline-offset-3 ms-1">
                        Register here
                    </Link>
                </p>
            </div>
            {isLoading && <Loading/>}
            <div className="bg-rose-200 w-96 rounded-2xl py-10 lg:py-10 lg:rounded-s-none lg:rounded-e-2xl px-3">
                <h1 className="text-3xl text-center font-black lg:mt-14">Login</h1>
                <form onSubmit={handleSubmit} className="px-4 mt-6 lg:mt-12">
                    <div className="mb-3">
                        <label htmlFor="srcode" className="text-md">Srcode</label>
                        <input 
                            type="text" 
                            name="srcode" 
                            id="srcode"
                            className= "block p-2 max-w-fit min-w-full rounded-lg bg-red-50"
                            onChange={(e) => setSrcode(e.target.value)}
                            value={srcode}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="text-md">Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            id="password"
                            className="block p-2 max-w-fit min-w-full rounded-lg bg-red-50"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>
                    <div className="flex justify-center mb-4">
                        <button disabled={isLoading} className="size-full py-2 rounded-lg bg-gray-800 text-gray-100">Login</button>
                    </div>
                    {error && <Error error={error}/>}
                </form>
                
            </div>
        </section>
    )
}

export default StudentLogin