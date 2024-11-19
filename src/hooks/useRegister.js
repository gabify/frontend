import { useState } from 'react'
import {useAuthContext} from '../hooks/useAuthContext'

export const useRegister = () =>{
    const [error, setError] = useState(null)
    const[isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const registerUser = async(srcode, password, userLevel) =>{
        const user = {srcode, password, userLevel}
        const response = await fetch('/api/v1/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(user)
        })

        const result = await response.json()
        console.log(result)

        if(!response.ok){
            setIsLoading(false)
            return {user:result, isOk: false}
        }else{
            return {user:result, isOk: true}
        }
    }

    const registerStudent = async({srcode, password, name, year, course, section, userLevel}) =>{
        setIsLoading(true) //Init loading
        
        const {user, isOk} = await registerUser(srcode, password, userLevel) //register user

        if(isOk){
            const student = {userId:user._id, name, year, course, section}
            const response = await fetch('/api/v1/student/new', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(student)
            })

            const result = await response.json()

            if(!response.ok){
                setError(result.error)
                setIsLoading(false)
            }else{
                //save user to local storage
                localStorage.setItem('user', JSON.stringify(user))

                //update auth context
                dispatch({type:'LOGIN', payload: user})

                setIsLoading(false)
            }
        }else{
            setError(user.error)
        }
    }

    return {registerStudent, isLoading, error}
}