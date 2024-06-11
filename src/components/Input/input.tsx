import React, {useState} from "react";
import Create from "../Create/create";

export default function Input(){
    const [inputValue, setInputValue] = useState<string>('');
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    return(
        <>
         <input placeholder="Add a new assignment" type="text" value={inputValue} onChange={handleInputChange} />
         <Create inputValue={inputValue} />
        </>
    )
}