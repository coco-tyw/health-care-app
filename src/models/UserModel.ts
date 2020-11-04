import BaseModel from './BaseModel'

export default class UserModel extends BaseModel {
  
  static _deserialize(json: any) {
    return json
  }

  constructor() {
    super(`${process.env.VUE_APP_API_ENDPOINT}/users`) 
  }

  deserialize(json: any) {
    if('users' in json) {
      return {...json, users: json.users.map(UserModel._deserialize)}
    }
    return UserModel._deserialize(json)
  }
}
