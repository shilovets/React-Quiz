import React from 'react';

import './Input.scss';

const Input = props => {

    function isInvalid({valid, touched, shouldValidate}) {
        return !valid && shouldValidate && touched

    }

    const cls = ['Input'],
        inputType = props.type || 'text',
        htmlFor = `${inputType}-${Math.random()}`;

    if (isInvalid(props)) {
        cls.push('invalid')
    }

    return (
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input
                type={inputType}
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}
            />

            {
                isInvalid(props)
                    ? <span>{props.errorMessage || 'Enter right value'}</span>
                    : null
            }


        </div>
    );
};

export default Input;