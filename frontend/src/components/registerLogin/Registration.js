import React from "react";
import "./register.css"

function Registration(props){
    const className = props.className;
    const type = props.type;
    const label = props.label;
    const name = props.name;
    const value = props.value;
    const warnings = props.warnings;

    return (
        <div className={className}>
            <label>
                {label}
            </label>
            <input type={type} name={name} value={value} onChange={props.onChange}/>
            <div className="warning">{warnings}</div>
        </div>
    )
}

export default Registration;