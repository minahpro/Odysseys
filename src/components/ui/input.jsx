"use client"

import { useEffect, useState } from "react";

const Input = ({ classes,name,type,handleOnChange,initialValue }) => {
  useEffect(() => {
    if(initialValue){
      setData(()=>initialValue)
    }
  

  }, [initialValue])
  
  const [data, setData] = useState("")
  return (
    <input
     onChange={(e)=>{
      setData(()=> e.target.value);
      
      handleOnChange(e);
     }}
     value={data}
     name={name}
     type={type}
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-3 ${
        classes ? classes : ""
      }`}
    />
  );
};

export default Input;
