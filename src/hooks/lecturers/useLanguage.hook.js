import React,{useState} from 'react'
import { useQuery } from '@tanstack/react-query'
import { lecturersApi } from '../../services'
// Use client-only toast to avoid SSR errors
import { toast } from '../../utils/conditionalToast'
import { language } from '../../pages/lecturers/data'

export const useLanguagesHook = () => {
    const [languagedata, setLanguageData] = useState([])

    const {data} = useQuery(["languages"], () => lecturersApi.getLanguages(), 
    {
        onSuccess: (data) => {
            setLanguageData([...language,...data])
        },
        onError: (error) => {
            
            toast.error("Unable to load data");
        }
    })


    return {
        data: languagedata
    }


}
