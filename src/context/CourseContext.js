import { createContext, useReducer } from "react";

export const CourseContext = createContext()

export const courseReducer = (state, action) =>{
    switch(action.type){
        case 'SET_COURSES':
            return {
                courses: action.payload
            }
        case 'CREATE_COURSE':
            return{
                courses: [...state.courses, action.payload]
            }
        case 'ADD_COURSE':
            return{
                courses: [...state.courses, ...action.payload]
            }

        default:
            return state
    }
}

export const CourseContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(courseReducer, {
        courses: null
    })

    return (
        <CourseContext.Provider value={{...state, dispatch}}>
            { children }
        </CourseContext.Provider>
    )
}