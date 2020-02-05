import React, {Component} from "react";

import "./QuizCreator.scss";
import Button from "../../components/UI/Button/Button";
import {createControl, validate, validateForm} from "../../form/formFramework";
import Input from "../../components/UI/Input/Input";
import Select from "../../components/UI/Select/Select";

function createOptionControl(number) {
    return createControl({
        label: `Option ${number}`,
        errorMessage: 'Value cannot be empty',
        id: number
    }, {required: true})
}

//обнуление всего стэйта, после добавления нового вопроса.( Очистятся поля, чтобы вводить новый вопрос)
function createFormControls() {
    return {
        question: createControl({
            label: 'Enter question',
            errorMessage: 'The field cannot be empty'
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4)
    }
}

class QuizCreator extends Component {

    state = {
        isFormValid: false,
        quiz: [],
        rightAnswerId: 1,
        formControl: createFormControls()
    };

    sibmitHandler = event => {
        event.preventDefault();
    };

    onChangeHandler = (value, controlName) => {
        let formControl = {...this.state.formControl},
            control = formControl[controlName];

        control.value = value;
        control.touched = true;
        control.valid = validate(control.value, control.validation);


        this.setState({
            formControl,
            isFormValid: validateForm(formControl)
        })

    };

    createQuizHandler = () => {
        
    };

    addQuestionHandler = () => {
        const quiz = this.state.quiz,
            index = quiz.length + 1,
            {question, option1, option2, option3, option4} = this.state.formControl;

        const questionItem = {
            question: question.value,
            id: index,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id}
            ]
        };

        quiz.push(questionItem);

        this.setState({
            quiz,
            isFormValid: false,
            rightAnswerId: 1,
            formControl: createFormControls()
        });
    };

    renderInputs() {
        return Object.keys(this.state.formControl).map((controlName, index) => {
            let control = this.state.formControl[controlName];
            return (
                <React.Fragment key={controlName + index}>
                    <Input
                        value={control.value}
                        label={control.label}
                        errorMessage={control.errorMessage}
                        touched={control.touched}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        onChange={event => {
                            this.onChangeHandler(event.target.value, controlName)
                        }}
                    />

                    {index === 0 ? <hr/> : null}
                </React.Fragment>
            )
        })
    };

    selectChangeHandler = event => {
        this.setState({
            rightAnswerId: +event.target.value
        })
    };

    render() {
        const select = <Select
            label='Choose correct answer'
            value={this.state.rightAnswerId}
            onChange={this.selectChangeHandler}
            options={[
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3},
                {text: 4, value: 4}
            ]}
        />

        return (
            <div className='QuizCreator'>
                <div>
                    <h1> Create test</h1>


                    <form onSubmit={this.sibmitHandler}>

                        {this.renderInputs()}

                        {select}

                        <div className='QuizCreator_btnBox'>
                            <Button
                                type='primaryBtn'
                                onClick={this.addQuestionHandler}
                                disabled={!this.state.isFormValid}
                            >
                                Add Question
                            </Button>
                            <Button
                                type='successBtn'
                                onClick={this.createQuizHandler}
                                disabled={this.state.quiz.length === 0}
                            >
                                Create test
                            </Button>
                        </div>

                    </form>
                </div>

            </div>
        );
    };
};

export default QuizCreator;