import axios, {AxiosRequestConfig, AxiosError} from 'axios'
import qs from 'qs'
import {getAccessToken, isExpired} from '@/plugins/token'
import dayjs from 'dayjs'

export default class BaseModel {

  static getAccessToken = getAccessToken
  static isExpired = isExpired

  static getHeaders() {
    return {
      'X-Requested-With': location.href, // for CSRF Filter,
      'Content-Type': 'application/json'
    }
  }

  static stringify = (query = {}) => qs.stringify(query, {indices: false})

  static signOut() {
    location.href = '/signIn?signedOut=true'
  }

  static toDayjs(value: any) {
    if (null == value) return null
    if (Number.isInteger(value)) return dayjs(value * 1000)
    return dayjs(value)
  }

  static toDate(value: any) {
    if (null == value) return null
    if (Number.isInteger(value)) return new Date(value * 1000)
    return dayjs(value).toDate()
  }

  protected axios = axios.create({
    headers: BaseModel.getHeaders()
  })

  constructor(baseURL: string) {
    this.axios = axios.create({baseURL, headers: BaseModel.getHeaders()})
  }

  public async get(id: string | number, query = {}, config: AxiosRequestConfig = {}) {
    this.filterExp()

    return this.axios
        .get(`/${id}?${BaseModel.stringify(query)}`, config)
        .then(this.postFetch.bind(this))
        .catch(this.postError.bind(this))
  }

  public async getList(params = {}, config: AxiosRequestConfig = {}): Promise<any> {
    this.filterExp()

    return this.axios
        .get('', {params, ...config})
        .then(this.postFetch.bind(this))
        .catch(this.postError.bind(this))
  }

  public async post(data = {}, config: AxiosRequestConfig = {}) {
    this.filterExp()

    return this.axios
        .post('', data, config)
        .then(this.postFetch.bind(this))
        .catch(this.postError.bind(this))
  }

  public async put(id: string | number, data = {}, config: AxiosRequestConfig = {}) {
    this.filterExp()

    return this.axios
        .put(`/${id}`, data, config)
        .then(this.postFetch.bind(this))
        .catch(this.postError.bind(this))
  }

  public async patch(id: string | number, data = {}, config: AxiosRequestConfig = {}) {
    this.filterExp()

    return this.axios
        .patch(`/${id}`, data, config)
        .then(this.postFetch.bind(this))
        .catch(this.postError.bind(this))
  }

  public async delete(id: string | number, config: AxiosRequestConfig = {}) {
    this.filterExp()

    return this.axios
        .delete(`/${id}`, config)
        .catch(this.postError.bind(this))
  }

  protected filterExp() {
    // if (BaseModel.isExpired()) {
    //   throw ({code: '401'})
    // }
  }

  protected postFetch(response = {data: {}}) {
    return Promise.resolve({
      data: this.deserialize(response.data)
    })
  }

  protected postError(error: AxiosError) {
    if (error.response) {
      return Promise.reject(error)
    }
    console.error(this.constructor.name, error)
    const data = 'Network Error' === error.message ?
        {code: '900', message: '通信エラー'} : 'TypeError' === error.name ?
        {code: '910', message: '予期せぬエラーが発生しました'} :
        {code: '990', message: '予期せぬエラーが発生しました'}
    return Promise.reject({response: {
        data: Object.assign(data, error)}
    })
  }

  protected deserialize(json = {}): any {
    return Object.assign({}, json)
  }
}
