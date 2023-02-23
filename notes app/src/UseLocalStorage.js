
import { useEffect, useState } from 'react';


export const UseLocalStorage = (key, intialValue)=>{

    const [value, setValue] = useState(()=>{

        const jsonValue = localStorage.getItem(key)
        if(jsonValue=== null){
            if(typeof intialValue === "function" ){
                return intialValue()
            }else{return intialValue}
        }else{ return JSON.parse(jsonValue)
        }
    }
    )

    useEffect(()=>{
        localStorage.setItem(key, JSON.stringify(value))
    }, [value, key])

        return [value, setValue]
}