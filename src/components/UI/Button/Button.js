import React from "react";

import "./Button.scss";

const Button = props => {
    const cls=[
        'Button',
        props.type
    ]

    return(
        <button
            className={cls.join(' ')}
            disabled={props.disabled}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    )
}

export default Button;