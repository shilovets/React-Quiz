import axios from '../../axios/axios-quiz';
import {
    FETCH_QUIZ_ONE_SUCCESS,
    FETCH_QUIZES_ERROR,
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS,
    FINISH_QUIZ,
    QUIZ_NEXT_QUESTION,
    QUIZ_SET_STATE,
    RETRY_QUIZ
} from "./actionTypes";

export function fetchQuizes() {
    return async dispatch => {
        dispatch(fetchQuizesStart());
        try {
            const response = await axios.get('quizes.json');
            const quizes = [];

            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Test №${index + 1}`
                })
            });

            dispatch(fetchQuizesSuccess(quizes));

        } catch (e) {
            dispatch(fetchQuizesError(e));
        }
    };
}

export function fetchQuizById(quizId) {
    return async dispatch => {
        dispatch(fetchQuizesStart());

        try {
            const respose = await axios.get(`/quizes/${quizId}.json`);
            const quiz = respose.data;

            dispatch(fetchOneQuizSuccess(quiz));

        } catch (e) {
            dispatch(fetchQuizesError(e));
        }

    }
}

export function fetchOneQuizSuccess(quiz) {
    return {
        type: FETCH_QUIZ_ONE_SUCCESS,
        quiz
    }
}

export function fetchQuizesStart() {
    return {
        type: FETCH_QUIZES_START
    }

}

export function fetchQuizesSuccess(quizes) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes
    }
}

export function fetchQuizesError(e) {
    return {
        type: FETCH_QUIZES_ERROR,
        error: e
    }
}

export function quizSetState(answerState, results) {
    return {
        type: QUIZ_SET_STATE,
        answerState, results
    };
}

export function finishQuiz() {
    return {
        type: FINISH_QUIZ
    }
}

export function quizNextQuistion(activeQuestion) {
    return {
        type: QUIZ_NEXT_QUESTION,
        activeQuestion
    }
}

export function isQuizFinished(state) {
    return state.activeQuestion + 1 === state.quiz.length;
}

export function retryQuiz() {
    return {
        type: RETRY_QUIZ
    }
}

export function quizAnswerClick(answerId) {
    return (dispatch, getState) => {
        const state = getState().quizList;
        if (state.answerState) {
            const key = Object.keys(state.answerState)[0];
            if (state.answerState[key] === 'success') {
                return
            }
        }

        const question = state.quiz[state.activeQuestion];
        let {results} = state;

        if (question.rightAnswerId === answerId) {

            if (!results[question.id]) {
                results[question.id] = 'success';
            }

            dispatch(quizSetState({[answerId]: 'success'}, results));

            const timeout = window.setTimeout(() => {
                if (isQuizFinished(state)) {
                    dispatch(finishQuiz());
                } else {
                    dispatch(quizNextQuistion(state.activeQuestion + 1));
                }

                window.clearTimeout(timeout);
            }, 500)

        } else {
            results[question.id] = 'error';
            dispatch(quizSetState({[answerId]: 'error'}, results));
        }
    }
}