import AxiosFactory from '@/api/base'
import axiosOrigin from 'axios'

const axios = AxiosFactory.create()
axios.defaults.baseURL = 'https://sop.jdcloud.com'

export function fetchTest () {
  return axios.post('mock/service')
  // return axios({
  //   url: '/api/sop/initSopMfaQrCode',
  //   method: 'POST',
  //   data: {}
  // })
}

export function fetchTest2 () {
  return axiosOrigin.get('mock/service')
}
