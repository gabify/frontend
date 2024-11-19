import {useEffect, useState, useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import {useCourseContext} from '../hooks/useCourseContext'
import CourseList from '../components/CourseList'
import ClassForm from '../components/ClassForm'
import Loading from '../components/Loading'
import {useAuthContext} from '../hooks/useAuthContext'
import {useLogout} from '../hooks/useLogout'

const AdminHome = () =>{
    const {courses, dispatch} = useCourseContext()
    const {user} = useAuthContext()
    const {logout} = useLogout()
    const [isPending, setIsPending] = useState(null)
    const logoutRef = useRef(logout)
    const navigate = useNavigate()

    useEffect(()=>{
        logoutRef.current = logout
    }, [logout])

    useEffect(() =>{
        const fetchClass = async() =>{
            setIsPending(true)
            const response = await fetch(`/api/v1/class/all`,{
                headers: {
                    'Authorization' : `Bearer ${user.token}`
                }
            })
            const data = await response.json()

            if(response.ok){
                dispatch({type: 'SET_COURSES', payload: data})
                setIsPending(false)
            }else{
                logoutRef.current()
            }   
        }

        if(user){
            fetchClass()
        }else{
            setIsPending(false)
        }

    }, [dispatch, user, setIsPending])

    //redirect to specific class
    const handleClick = (courseId) =>{
        navigate(`/course/${courseId}`)
    }
    
    
    return(
        <div>
            <div className="flex items-center">
                <h2 className='tracking-tight font-semibold text-3xl me-2'>My Class</h2>
                <ClassForm />
            </div>
            {isPending && <Loading/>}
           <div className="lg:grid lg:grid-cols-4 gap-3">
                <CourseList courses={courses} handleClick={handleClick}/>
           </div>
        </div>
    )
}

export default AdminHome