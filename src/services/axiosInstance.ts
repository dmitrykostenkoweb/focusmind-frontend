import axios, { type AxiosInstance } from 'axios'
import qs from 'qs'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: {
    serialize: (params) => {
      return qs.stringify(params, { arrayFormat: 'repeat' })
    },
  },
})

export default axiosInstance
