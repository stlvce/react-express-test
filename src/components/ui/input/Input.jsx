import React from "react";
import classes from "./input.module.css";

export default function Input({ ...props }) {
    return (
        <input 
            className={classes.inpt}
            type="text" 
            {...props}
        />    
    )
}