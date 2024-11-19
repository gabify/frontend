import {useParams } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"
import { usePost } from "../hooks/usePost"
import Loading from "../components/Loading"
import Error from "../components/Error"
import useFetch from "../hooks/useFetch"
import { useEffect, useState } from "react"

const CourseView = () =>{
    const {courseId} = useParams()
    const {user} = useAuthContext()
    const {sendData, isLoading, error} = usePost()
    const {data:attendance, isPending, error:fetchError } = useFetch(`/api/v1/attendance?userId=${user._id}&courseId=${courseId}`)
    const [isDisabled, setIsDisabled] = useState(null)

    const handleClick = async() =>{
        await sendData(`/api/v1/attendance/${user._id}`, 'PATCH', {courseId, status:'Present'})

        if(!error){
            setIsDisabled(true)
        }
    }

    useEffect(()=>{
        if(!fetchError){
            if(!isPending){
                setIsDisabled(attendance.status === 'Present' ? true: false)
            }
        }else{
            setIsDisabled(true)
        }
    }, [attendance, setIsDisabled, fetchError, isPending])



    return(
        <section className='px-2 lg:px-8 py-3'>
            {isPending && <Loading />}
            {(isLoading) && <Loading />}
            <h2 className='text-center lg:text-start tracking-tight font-semibold text-3xl me-2'>My Class</h2>
            {!fetchError &&
                <button 
                    className={`px-2 rounded-lg ${isDisabled ? "bg-green-300 text-white":"border-2 border-green-600 text-green-600 transition delay-150 duration-500 ease-in-out hover:bg-green-600 hover:text-white"}`}
                    onClick={handleClick}
                    disabled={isDisabled}>
                    
                            Present
                </button>
            }
            {error && <Error error={error}/>}
        </section>
    )

}

export default CourseView