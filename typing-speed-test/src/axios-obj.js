import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://max-typing-speed.firebaseio.com/'
});

export default instance;
