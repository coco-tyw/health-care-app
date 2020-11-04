import BaseModel from './BaseModel'
import {AxiosRequestConfig} from 'axios'

export default class AuthModel extends BaseModel {

  constructor() {
    super(`${process.env.VUE_APP_API_ENDPOINT}`)
  }

  public async signUp(data: SignInQuery, config: AxiosRequestConfig = {}) {
    return this.axios
        .post('/users', data, config)
        .catch(this.postError.bind(this))
  }
}

export type SignUpQuery = {
  name: string
  password: string
}

export type SignInQuery = SignUpQuery
