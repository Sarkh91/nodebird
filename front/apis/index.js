import axios from 'axios';
import { backUrl } from '../config/config';

export * from './user';
export * from './post';

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;
