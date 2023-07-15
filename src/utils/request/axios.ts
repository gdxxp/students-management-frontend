import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import cache from '@/utils/cache'
import { Message } from '@arco-design/web-vue'

const axiosInstance = axios.create({
  baseURL: '/management'
})

export const request = <T = any>(url: string, config: AxiosRequestConfig): Promise<T> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .request({
        url,
        headers: {
          Authorization: cache.get('token') || ''
        },
        ...(config || {})
      })
      .then((response: AxiosResponse<T>) => {
        resolve(response.data as unknown as T)
      })
      .catch((error: AxiosError) => {
        Message.error({
          content: '网络错误'
        })
        reject(error)
      })
  })
}
