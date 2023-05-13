import React from "react";
import classes from "./button.module.css";

export default function Button({ children, ...props }) {
    return (
        <button className={classes.btn} {...props}>{children}</button>    
    )
}