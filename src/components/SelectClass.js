import { useRef, useState } from "react"
import useFetch from "../hooks/useFetch"
import Loading from '../components/Loading'
import CloseIcon from '@mui/icons-material/Close';
import { usePost } from "../hooks/usePost";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCourseContext } from "../hooks/useCourseContext";

const SelectClass = ({section}) =>{
    const [addButton, setAddButton] = useState('+')
    const {data:courses} = useFetch(`/api/v1/class/section/${section}`)
    const dialogRef = useRef(null)
    const [selectedCourses , setSelectedCourses] = useState([])
    const {sendData, error:postError, isLoading:postLoading} = usePost()
    const {user} = useAuthContext()
    const {courses: localCourses, dispatch} = useCourseContext()

    const selectionOfCourses = courses ? courses.filter(course => 
        !localCourses.some(localCourses => localCourses._id === course._id)
    ) : []

    //Open modal
    const openForm = () =>{
        if(dialogRef.current){
            dialogRef.current.showModal()
        }
    }

    //Close Modal
    const closeForm = () =>{
        
        if(dialogRef.current){
            setSelectedCourses([])
            dialogRef.current.close()
        }
    }

    //Handle selecting of course
    const handleClick = (courseId) =>{
        setSelectedCourses(selectedCourses => {
            if(selectedCourses.includes(courseId)){
                return selectedCourses.filter(course => course !== courseId)
            }else{
                return [...selectedCourses, courseId]
            }
        })
    }

    const addClassToStudent = async(classes, userId) =>{
        const data = {classes}
        const result = await sendData(`/api/v1/student/add-many-class/${userId}`, 'PATCH', data)
        
        if(!postError){
            //Save data to authcontext
            dispatch({type: 'SET_COURSES', payload: result.myclass})

            return true
        }else{
            throw postError
        }
    }

    const addStudentToClass = async(userId, courses) =>{
        const data = {studentId: userId, courses}
        await sendData('/api/v1/class/add-student', 'POST', data)

        if(!postError){
            return true
        }else{
            throw postError
        }
    }

    const handleSubmit = async() =>{
        const result1 = await addClassToStudent(selectedCourses, user._id)
        const result2 = await addStudentToClass(user._id, selectedCourses)
    
        if(result1 === true && result2 === true){
            closeForm()

        }else{
            console.log(postError)
        }
        
    }

    
    return(
        <section>
            <button className="px-2 border-2 border-red-700 rounded-lg text-red-700 transition delay-150 duration-500 ease-in-out hover:bg-red-700 hover:text-gray-100" 
                    onMouseLeave={()=> setAddButton('+')} 
                    onMouseEnter={()=> setAddButton('Add Class')} 
                    onClick={openForm}>
                        {addButton}
            </button>

            <dialog ref={dialogRef} className="modal">
                <div>
                    <div className="modal-header">
                        <h4 className="modal-title">Select class to add</h4>
                        <button 
                        className="border-2 border-red-700 rounded-full p-1 text-red-700 hover:bg-red-700 hover:text-white transition delay-100 duration-300 ease-in-out" 
                        onClick={closeForm}>
                            <CloseIcon />
                        </button>
                    </div>
                </div>
                <div className="modal-body">
                    {(postLoading) && <Loading/>}
                    <div className="my-7 grid">
                        {selectionOfCourses.length !== 0 ? selectionOfCourses.map((course) =>(
                            <button className={`card cursor-pointer hover:bg-gray-800 hover:text-white ${
                                selectedCourses.includes(course._id) ? 'bg-gray-800 text-white' : 'bg-slate-100'
                            }`} 
                                key={course._id}
                                onClick={() => handleClick(course._id)}>
                                <div className="text-start">
                                    <h4 className='font-semibold'> {course.courseCode}</h4>
                                    <h5 className='font-light'>{course.courseTitle}</h5>
                                </div>
                            </button>
                        )) : <div> No courses available for you</div>}
                    </div>
                    <div className="flex justify-end">
                        <button disabled={selectedCourses.length === 0} onClick={handleSubmit} className={`me-2 px-2 py-2 rounded-lg ${
                            selectedCourses.length === 0 ? 'bg-red-400 text-red-200' : 'bg-red-700 text-gray-100'
                        }`}
                        >Add Class</button>
                        <button onClick={closeForm} className="px-2 py-2 rounded-lg text-gray-50 bg-gray-800">Cancel</button>
                    </div>
                    {postError && <p>{postError}</p>}
                </div>
            </dialog>
        </section>
    )
}

export default SelectClass