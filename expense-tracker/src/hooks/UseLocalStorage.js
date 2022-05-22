import { useEffect , useState } from "react";

export default function UseLocalStorage(key,defaultvalue){

    const [value,setvalue] = useState(()=>{

        const jsonvalue = localStorage.getItem(key)

        if(jsonvalue!=null){
            return JSON.parse(jsonvalue);
        }

        if(typeof defaultvalue === "function"){
            return defaultvalue();
        }
        else{
            return defaultvalue;
        }

    });

    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(value));
    },[key,value]);

    return [value,setvalue];
}