import axios, { AxiosRequestConfig } from 'axios'
import message from 'antd/lib/message'

export const useRequest = (params: {
  onSuccess?: (data: any) => void
}) => {
  const execute = async (config: AxiosRequestConfig) => {
    try {
      const { data } = await axios(config);
      params.onSuccess(data)
    } catch (error) {
      const errors = error.response.data.errors
      for(let error of errors) {
        message.error(error.message)
      }
    }
  }
  return execute;
}