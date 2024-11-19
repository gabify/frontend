const CourseList = ({courses, handleClick}) =>{
    return(
        <div className="my-7 grid lg:grid-cols-4 gap-3 lg:col-span-4">
            {courses && courses.map((course) =>(
                <div 
                    className='card group cursor-pointer bg-white hover:bg-gray-800 hover:text-gray-50' 
                    key={course._id}
                    onClick={() => handleClick(course._id)}>
                    <h4 className='card-header text-gray-400 group-hover:text-gray-50'> {course.courseCode}</h4>
                    <h5 className='card-title text-gray-600 group-hover:text-gray-50'>{course.courseTitle}</h5>
                    <div className="flex justify-between">
                        <p className="text-lg font-light">{course.section}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CourseList