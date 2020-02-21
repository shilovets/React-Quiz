import React, {Component} from "react";
import {connect} from "react-redux";

import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";
import {fetchQuizById, quizAnswerClick, retryQuiz} from "../../store/actions/quizList";

import "./Quiz.scss";

class Quiz extends Component {

    async componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id);
    };

    componentWillUnmount() {
        this.props.retryQuiz()
    };

    render() {
        return (
            <div className='Quiz'>
                <div className='Quiz__wrapper'>
                    <h1>Test na petuha</h1>
                    {
                        this.props.loading || !this.props.quiz
                            ? <Loader/>
                            : this.props.isFinished
                                ?
                                <FinishedQuiz
                                    results={this.props.results}
                                    quiz={this.props.quiz}
                                    onRetry={this.props.retryQuiz}
                                />
                                :
                                <ActiveQuiz
                                    questions={this.props.quiz[this.props.activeQuestion].question}
                                    answers={this.props.quiz[this.props.activeQuestion].answers}
                                    quizLength={this.props.quiz.length}
                                    questionNumber={this.props.activeQuestion + 1}
                                    state={this.props.answerState}
                                    onAnswerClick={this.props.quizAnswerCLick}
                                />
                    }
                </div>
            </div>
        )
    }
}
function mapStateToProps(state){
    return{
        error: state.quizList.error,
        results: state.quizList.results,
        activeQuestion: state.quizList.activeQuestion,
        answerState: state.quizList.answerState,
        isFinished: state.quizList.isFinished,
        quiz: state.quizList.quiz,
        loading: state.quizList.loading
    };
}

function mapDispatchToProps(dispatch){
    return{
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        quizAnswerCLick: answerId => dispatch(quizAnswerClick(answerId)),
        retryQuiz: () => dispatch(retryQuiz())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);