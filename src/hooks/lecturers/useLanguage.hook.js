import React,{useState} from 'react'
import { useQuery } from '@tanstack/react-query'
import { lecturersApi } from '../../services'

import { language } from '../../pages/lecturers/data'

export const useLanguagesHook = () => {
    const [languagedata, setLanguageData] = useState([])

    const {data} = useQuery(["languages"], () => lecturersApi.getLanguages(),
    {
        onSuccess: (data) => {
            setLanguageData([...language,...data])
        },
        onError: (error) => {
            
        }
    })


    return {
        data: languagedata
    }


}