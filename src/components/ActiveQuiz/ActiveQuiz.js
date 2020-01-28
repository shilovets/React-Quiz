import React from "react";
import AnswersList from "./AnswersList/AnswersList";

import './ActiveQuiz.scss';

const ActiveQuiz = props => (
    <div className='ActiveQuiz'>
        <p className="ActiveQuiz__question">
            <span>
                <strong>{props.questionNumber}. </strong>
                {props.questions}
            </span>
            <small>{props.questionNumber} из {props.quizLength}</small>
        </p>

        <AnswersList
            answers={props.answers}
            onAnswerClick={props.onAnswerClick}
            state={props.state}
        />
    </div>
)


export default ActiveQuiz;