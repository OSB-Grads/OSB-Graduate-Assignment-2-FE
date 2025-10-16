import React, { useEffect, useRef, useState } from 'react';
import './OTPInput.css'

interface OTPInputProps {
    length: number;
    onOtpSubmit: (otp: string) => void;
}

function OTPInput({ length, onOtpSubmit }: OTPInputProps) {

    const [otp, setOtp] = useState(new Array(length).fill(""));
    const inputsRef =  useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
    if (inputsRef.current[0]) {
      inputsRef.current[0].focus();
    }
  }, []);

    const handleChange = (index: number, e: any) => {
        const value = e.target.value;
        if (isNaN(value)) return;

        const newOtp = [...otp]
        // only 1 input in 1 box
        newOtp[index]= value.substring(value.length -1);
        setOtp(newOtp);

        //submit otp to Backend
        const combinedOtp = newOtp.join("");
        if(combinedOtp.length === length){
            onOtpSubmit(combinedOtp)
        }

        //move to next if current is filled
        if (value && index < length - 1 && inputsRef.current[index + 1]){
            inputsRef.current[index + 1]?.focus();
        } 

    }


    const handleClick = (index: any) => {
        //point at end of the integer
        const input = inputsRef.current[index]
        if(input) input.setSelectionRange(1,1);
     };
    const handleKeyDown = (index : number, e: any) => { 
        if(e.key === 'backspace'
             && !otp[index] 
             && index > 0
             && inputsRef.current[index - 1]
            ){
                const input= inputsRef.current[index - 1]
                if (input) input.focus();
            }
    };

    

    return (
        <div>
            {otp.map((value, index) => {
                return (
                <input
                    key={index}
                    type="text"
                    ref={(input) => {inputsRef.current[index] = input}}
                    value = {value}
                    onChange={(e) => handleChange(index, e)}
                    onClick={() => handleClick(index)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className='otpInput'
                />
                );
            })}
        </div>
    )
}

export default OTPInput
