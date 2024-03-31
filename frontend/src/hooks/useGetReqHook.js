import { useState } from "react";
import axios from "axios";

const useGetReqHook = ()=>{
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(null)

    const getRequest = async(url)=>{
        setLoading(true)

        try {

            const response = await axios.get(url)
            setLoading(false)
            return response.data
            
        } catch (error) {
            setLoading(false)
            setError(error.message)
            throw error
        }
    }

    return {loading,error,getRequest}
}

export default useGetReqHook