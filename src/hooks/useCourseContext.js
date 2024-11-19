import { CourseContext } from "../context/CourseContext";
import { useContext } from "react";

export const useCourseContext = () =>{
    const context = useContext(CourseContext)

    if(!context){
        throw Error('useCourseContext must be used inside a CourseContextProvider')
    }

    return context
}