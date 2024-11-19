import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';


const ClassList = ({students, isDisabled, handleClick, attendances, updateStat}) =>{

    const [openMenuForStudent, setOpenMenuForStudent] = useState(null)

    const handleOpen = (studentId) =>{
        setOpenMenuForStudent(openMenuForStudent === studentId ? null : studentId)
    }

    if(attendances && students){
        students.map((student) =>{
            const attendance = attendances.find((attendance) => attendance.userId === student.userId)
            student.status = attendance.status
            return student
        })
    }
    
    return(
        <div className="my-7 border rounded-lg">
            <div className="flex justify-between items-center mb-3 px-4 mt-3">
                <h2 className='tracking-tight font-semibold text-xl me-2'>Attendance</h2>
                <button 
                    className={`px-2 rounded-lg ${isDisabled ? 'bg-red-400 text-gray-100': 'border-2 border-red-700 text-red-700 transition delay-150 duration-500 ease-in-out hover:bg-red-700 hover:text-gray-100'}`}
                    disabled={isDisabled ? true: false}
                    onClick={handleClick}>
                        Create Attendance
                </button>
            </div>
            <ul className="list-decimal list-inside">
                {students && students.map((student, index) =>(
                    <li key={student._id} className="font-light border border-s-0 border-e-0 px-2 py-2 flex justify-between items-center">
                        <div>
                            <span className="me-3">{index + 1}.</span>
                            <span className="me-2">{student.name}</span>
                        </div>
                        <div>
                            {attendances && <span className={
                                `badge ${student.status === 'Present'? 'bg-green-600':'bg-yellow-500'} text-white`}>
                                    {student.status}
                                </span>
                            }
                            <button onClick={()=>handleOpen(student._id)}>
                                <MoreVertIcon className='text-gray-700'/>
                            </button>

                            <div className={`absolute right-4 z-10 mt-2 w-40 origin-top-right 
                                    rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 
                                    focus:outline-none 
                                    ${openMenuForStudent !== student._id ? 'hidden' : ''}`} 
                                    role="menu" 
                                    aria-orientation="horizontal" 
                                    aria-labelledby="menu-button" 
                                    tabIndex="-1">
                                <ul>
                                    <li className='hover:bg-gray-100 py-1 px-3'>
                                        <button onClick={()=>updateStat(student._id, 'Present')}>
                                            Present
                                        </button>
                                    </li>
                                    <li className='hover:bg-gray-100 py-1 px-3'>
                                        <button onClick={()=>updateStat(student._id, 'Absent')}>
                                            Absent
                                        </button>
                                    </li>
                                    <li className='hover:bg-gray-100 py-1 px-3'>
                                        <button onClick={()=>updateStat(student._id, 'Excused')}>
                                            Excused
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ClassList