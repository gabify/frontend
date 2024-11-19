import { useEffect, useState } from "react"
import {useAuthContext} from '../hooks/useAuthContext'

const useFetch = (url) =>{
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)
    const {user} = useAuthContext()

    useEffect(() =>{
        const fetchData = async() =>{
            const response = await fetch(url, {
                headers: {
                    'Authorization' : `Bearer ${user.token}`
                }
            })
            const data = await response.json()

            if(response.ok){
                setData(data)
                setIsPending(false)
            } 
            
            if(!response.ok){
                setError(data.error)
                setIsPending(false)
            }
        }

        if(user){
            fetchData()
        }else{
            setIsPending(false)
        }
    }, [url, user])

    return {data, isPending, error}
}

export default useFetch