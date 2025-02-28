import React, { useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoImageOutline } from "react-icons/io5";

import { FaRegClosedCaptioning } from "react-icons/fa";
import { ButtonContext } from "../context/ButtonContext";
import { FaRegLightbulb } from "react-icons/fa6";
import { TfiWrite } from "react-icons/tfi";
import { PiClipboardTextFill } from "react-icons/pi";


const ButtonList = ({input, setInput}) => {
  // Define an array of items with name and value
  const items = [
    { name: "Write for me",icon:<TfiWrite className="text-primary"/>, value: "Write for me" },
    { name: "Make a plan",icon: <FaRegLightbulb className="text-success"/>, value: "Make a plan" },
    { name: "Summarize text",icon :<PiClipboardTextFill className="text-warning"/> , value: "Summarize" }
  ];

  const {buttonValue,setButtonValue} = useContext(ButtonContext);


  const passPrompt = (value) => {
    setButtonValue(value);
  };
  
  
  useEffect(() => {
    setInput(buttonValue);
  }, [buttonValue]);

  return (
    <div className="mt-3">
      <div className="d-flex gap-2 justify-content-center flex-wrap">
        {items.map((item) => (
          <button onClick={()=> passPrompt(item.value)} key={item.value} className="btn btn-outline-secondary rounded-3 d-flex align-items-center gap-2">
            <span className="fs-4">{item.icon}</span>
            <span className="text-light">{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ButtonList;
