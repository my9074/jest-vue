import axios from 'axios'
import Vue from 'vue'
import parse from 'url-parse'

class AxiosFactory {
  static create (opt) {
    let instance = axios.create({...{ timeout: 30000, withCredentials: true }, ...opt})
    instance.interceptors.request.use(
      this.handleReqSuccess,
      this.handleReqError
    )
    instance.interceptors.response.use(
      this.handleResSuccess,
      this.handleResError
    )
    return instance
  }

  static handleReqSuccess (config) {
    const ENV = Vue.prototype.$JELEMENT_BIZ_ENV
    return tranformEnvConfig(config, ENV)
  }

  static handleReqError (error) {
    return Promise.reject(error)
  }

  static handleResSuccess (response) {
    if (response.data.error) {
      return Promise.reject(response.data.error)
    }

    return response.data.result ? response.data.result : response.data
  }

  static handleResError (error) {
    return Promise.reject(error)
  }
}

function tranformEnvConfig (config, prefix) {
  let parsed = parse(config.baseURL)

  if (prefix === 'stag' || prefix === 'test') {
    let hostArray = parsed.host.split('.')
    hostArray[0] = hostArray[0] + '-' + prefix
    parsed.set('host', hostArray.join('.'))
    parsed.set('protocol', 'http:')
  } else if (prefix === 'locale') {
    config.baseURL = ''
    return config
  }

  config.baseURL = parsed.href
  return config
}

export default AxiosFactory
