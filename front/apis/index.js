import axios from 'axios';

export * from './user';
export * from './post';

axios.defaults.baseURL = 'http://localhost:3065';
axios.defaults.withCredentials = true;
