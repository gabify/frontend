import {useParams } from "react-router-dom"
import {useState, useEffect} from 'react'
import useFetch from "../hooks/useFetch"
import {usePost} from "../hooks/usePost"
import Loading from "../components/Loading"
import ClassList from "../components/ClassList"
import Error from "../components/Error"

const StudentList = () =>{

    const {courseId} = useParams()
    const [isDisabled, setIsDisabled] = useState(null)
    const {sendData, isLoading, error:postError} = usePost()
    const {data:students, isPending, error} = useFetch(`/api/v1/class/students/${courseId}`)
    const {
            data:attendances, 
            isPending:attendanceLoading, 
            error:attendanceError
        } = useFetch(`/api/v1/attendance/${courseId}`)

    useEffect(() =>{
        setIsDisabled(attendanceError === "No attendance found" ? false :true)

    }, [attendanceError, setIsDisabled])


    const handleClick = async() =>{
        await sendData('/api/v1/attendance/new', 'POST', {courseId})
        setIsDisabled(true)
    }

    const updateStat = async(studentId, status) =>{
        //const result = await sendData(`/api/v1/attendance/${studentId}`, 'PATCH', {courseId, status})
        console.log(courseId)
    }

    return(
        <section className='px-2 lg:px-8 py-3'>
            {(isPending || isLoading || attendanceLoading) && <Loading />}
            <h2 className='text-center lg:text-start tracking-tight font-semibold text-3xl me-2'>My Class</h2>
           {<div className="lg:grid lg:grid-cols-3 gap-3">
                <ClassList students={students} 
                isDisabled={isDisabled} 
                handleClick={handleClick} 
                attendances={attendances}
                updateStat={updateStat}
                className="lg:col-span-3"/>
           </div>}
            {error && <Error error={error}/>}
            {postError && <Error error={postError}/>}
        </section>
    )

}

export default StudentList