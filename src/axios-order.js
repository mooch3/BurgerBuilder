import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-66a7a-default-rtdb.firebaseio.com/',
});

export default instance;