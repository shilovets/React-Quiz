import React, {Component} from "react";
import axios from "../../axios/axios-quiz";

import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

import "./Quiz.scss";
import Loader from "../../components/UI/Loader/Loader";

class Quiz extends Component {
    state = {
        results: {},
        activeQuestion: 0,
        answerState: null,
        isFinished: false,
        loading: true,
        quiz: []
    };

    async componentDidMount() {
        try {
            const respose = await axios.get(`/quizes/${this.props.match.params.id}.json`);
            const quiz = respose.data;

            this.setState({
                quiz, loading: false
            });

        } catch (e) {
            console.log(e);
        }

    };

    onAnswerClickHandler = answerId => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0];
            if (this.state.answerState[key] === 'success') {
                return
            }
        }
        ;

        const question = this.state.quiz[this.state.activeQuestion];
        let {results} = this.state;

        if (question.rightAnswerId === answerId) {

            if (!results[question.id]) {
                results[question.id] = 'success';
            }

            this.setState({
                answerState: {[answerId]: 'success'},
                results
            });

            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    })
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }

                window.clearTimeout(timeout);
            }, 500)

        } else {
            results[question.id] = 'error';
            this.setState({
                answerState: {[answerId]: 'error'},
                results
            })
        }


    };

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length;
    };

    retryHandler = () => {
        this.setState({
            results: {},
            answerState: null,
            activeQuestion: 0,
            isFinished: false
        })
    };

    render() {
        return (
            <div className='Quiz'>
                <div className='Quiz__wrapper'>
                    <h1>Test na petuha</h1>
                    {
                        this.state.loading
                        ? <Loader/>
                        : this.state.isFinished
                            ?
                            <FinishedQuiz
                                results={this.state.results}
                                quiz={this.state.quiz}
                                onRetry={this.retryHandler}
                            />
                            :
                            <ActiveQuiz
                                questions={this.state.quiz[this.state.activeQuestion].question}
                                answers={this.state.quiz[this.state.activeQuestion].answers}
                                quizLength={this.state.quiz.length}
                                questionNumber={this.state.activeQuestion + 1}
                                state={this.state.answerState}
                                onAnswerClick={this.onAnswerClickHandler}
                            />
                    }
                </div>
            </div>
        )
    }
}

export default Quiz;