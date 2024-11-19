import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

export const usePost = () =>{
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {user} = useAuthContext()

    const sendData = async(url, method, data) =>{
        try{
            setIsLoading(true)
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${user.token}`
                },
                body: JSON.stringify(data)
            })
            const result = await response.json()
            setIsLoading(false)
            return result
        }catch(error){
            setError(error)
            setIsLoading(false)
        }
    }
    return {sendData, error, isLoading}
}