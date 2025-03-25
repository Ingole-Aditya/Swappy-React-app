import { faTheRedYeti } from '@fortawesome/free-brands-svg-icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
export default function Protected({children,authentication=true}) {
    const dispatch = useDispatch()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.status)
    const navigate = useNavigate()
    
    useEffect(() => {
        if (authentication && authentication != authStatus) {
            navigate("/login")
        } else if (!authentication && authentication != authStatus) {
            navigate("/")
        }
        setLoader(false)
    }, [navigate, authStatus, authentication])
    
    
    return loader ? <h1>Loading..</h1> : <>{children}</>
}
