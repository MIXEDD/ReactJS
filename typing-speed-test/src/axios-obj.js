import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://typing-speed-test-88b91.firebaseio.com/'
});

export default instance;
