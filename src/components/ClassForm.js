import { useRef, useState } from "react"
import {useCourseContext} from '../hooks/useCourseContext'
import { useAuthContext } from "../hooks/useAuthContext"
import CloseIcon from '@mui/icons-material/Close';


const ClassForm = () =>{
    const {dispatch} = useCourseContext()
    const [courseCode, setCourseCode] = useState('')
    const [courseTitle, setCourseTitle] = useState('')
    const [schoolYear, setSchoolYear] = useState('')
    const [semester, setSemester] = useState('')
    const [section, setSection] = useState('')
    const [error, setError] = useState(null)
    const {user} = useAuthContext()
    const [addButton, setAddButton] = useState('+')

    const dialogRef = useRef(null)

    const handleSubmit = async(e) =>{
        e.preventDefault()

        if(!user){
            setError('Please login and try again')
            return
        }
        
        //form validation

        const course = {courseCode, courseTitle, schoolYear, semester, section}

        const response = await fetch('/api/v1/class/new', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${user.token}`
            },
            body: JSON.stringify(course)
        })

        const result = await response.json()

        if(!response.ok){
            setError(result.error)
            console.log(result.error)
        }else{
            if(dialogRef.current){
                setError(null)
                setCourseCode('')
                setCourseTitle('')
                setSchoolYear('')
                setSection('')
                setSemester('')
                dispatch({type:'CREATE_COURSE', payload: result})
                dialogRef.current.close()
            }
        }
    }

    const openForm = () =>{
        if(dialogRef.current){
            dialogRef.current.showModal()
        }
    }

    const closeForm = (e) =>{
        e.preventDefault()
        
        if(dialogRef.current){
            setError(null)
            setCourseCode('')
            setCourseTitle('')
            setSchoolYear('')
            setSection('')
            setSemester('')
            dialogRef.current.close()
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
            <dialog ref={dialogRef} className="modal bg-gray-100">
                <div>
                    <div className="modal-header">
                        <h4 className="modal-title">Add new Class</h4>
                        <button 
                        className="border-2 border-red-700 rounded-full p-1 text-red-700 hover:bg-red-700 hover:text-white transition delay-100 duration-300 ease-in-out" 
                        onClick={closeForm}>
                            <CloseIcon />
                        </button>
                    </div>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="courseCode" className="form-label">Course Code</label>
                            <input 
                                type="text" 
                                name="courseCode" 
                                id="courseCode"
                                className="text-field"
                                onChange={(e) => setCourseCode(e.target.value)}
                                value={courseCode}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="courseTitle" className="form-label">Course Title</label>
                            <input 
                                type="text" 
                                name="courseTitle" 
                                id="courseTitle"
                                className="text-field"
                                onChange={(e) => setCourseTitle(e.target.value)}
                                value={courseTitle}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="schoolYear" className="form-label">School Year</label>
                            <input 
                                type="text" 
                                name="schoolYear" 
                                id="schoolYear"
                                className="text-field"
                                onChange={(e) => setSchoolYear(e.target.value)}
                                value={schoolYear}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="semester" className="form-label">Semester</label>
                            <input 
                                type="text" 
                                name="semester" 
                                id="semester"
                                className="text-field"
                                onChange={(e) => setSemester(e.target.value)}
                                value={semester}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="section" className="form-label">Section</label>
                            <input 
                                type="text" 
                                name="section" 
                                id="section"
                                className="text-field"
                                onChange={(e) => setSection(e.target.value)}
                                value={section}
                            />
                        </div>

                        <div className="flex justify-end gap-x-2">
                            <button className="btn bg-orange-700 rounded-sm text-gray-50">Add Class</button>
                            <button className="btn bg-gray-700 text-gray-50" onClick={closeForm}>Close</button>
                        </div>
                        {error && <div>{error}</div>}
                    </form>
                </div>
            </dialog>
        </section>
    )
}

export default ClassForm