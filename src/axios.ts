import { AxiosRequestConfig, Axios } from './types';
import xhr from './xhr';

const axios: Axios = (config: AxiosRequestConfig): void => {
  xhr(config)
}


export default axios;