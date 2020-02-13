import axios from "axios";

export default axios.create({
    baseURL: 'https://react-quiz-39ce9.firebaseio.com/'
});