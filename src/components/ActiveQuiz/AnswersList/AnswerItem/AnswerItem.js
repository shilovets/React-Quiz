import React from 'react'
import "./AnswerItem.scss"

const AnswerItem = props => {
    const itemClasses = ['AnswerItem'];

    if (props.state) {
        itemClasses.push(props.state)
    }

    return (
        <li
            className={itemClasses.join(' ')}
            onClick={() => {
                props.onAnswerClick(props.answer.id)
            }}
        >
            {props.answer.text}
        </li>
    )
};

export default AnswerItem;