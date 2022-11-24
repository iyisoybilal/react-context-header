import React, { useEffect } from "react";

const CustomButton = (props) => {
    useEffect(() => {
        console.log(props.text)
    }, [props.text])

    const onclick = () => {
        if (props.onClick) {
            props.onClick();
        }
    }

    return <button onClick={onclick} className={props.class}>{props.text ? props.text : 'default'}</button>
}

export default CustomButton