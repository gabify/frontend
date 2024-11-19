import { useAuthContext } from "./useAuthContext"
import { useCourseContext } from "./useCourseContext"

export const useLogout = () =>{
    const {dispatch} = useAuthContext()
    const {dispatch: courseDispatch} = useCourseContext()
    
    const logout = () =>{
        //remove user from storage
        localStorage.removeItem('user')

        //Remove user from AuthContext
        dispatch({type: 'LOGOUT'})

        //Remove global data from CourseContext
        courseDispatch({type: 'SET_COURSES', payload: null})
    }

    return {logout}
}