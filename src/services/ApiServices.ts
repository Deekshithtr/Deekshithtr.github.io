import axios from 'axios';

export const axiosApiInstance = axios.create();

const ApiServices = {
  get({ url, options }: any) {
    const requestOptions = {
      method: 'GET',
      ...options,
    };
    return this.fetch({ url, requestOptions });
  },

  async fetch({ url, requestOptions }: any) {
    const {
      endpoint = '',
      version = '',
      params = undefined,
      headers = undefined,
      withToken = true,
      ...rest
    } = requestOptions;
    const result = await axiosApiInstance({
      method: rest.method,
      url: url,
      headers: headers,
      ...rest,
    });
    return result;
  },
};

export default ApiServices;
