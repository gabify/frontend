import { useState } from 'react'
import {useAuthContext} from '../hooks/useAuthContext'

export const useLogin = () =>{
    const [error, setError] = useState(null)
    const[isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const login = async(srcode, password) =>{
        setIsLoading(true)
        const user = {srcode, password}
        const response = await fetch('/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(user)
        })

        const result = await response.json()

        if(!response.ok){
            setError(result.error)
            setIsLoading(false)
        }else{
            //save user to local storage
            localStorage.setItem('user', JSON.stringify(result))

            //update auth context
            dispatch({type:'LOGIN', payload: result})

            setIsLoading(false)
        }
    }

    return {login, isLoading, error}
}