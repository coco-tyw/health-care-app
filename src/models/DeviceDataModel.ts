import BaseModel from './BaseModel'

export default class DeviceDataModel extends BaseModel {
  
  static _deserialize(json: any) {
    return Object.assign(json, {
      // createdAt: super.toDate(json.createdAt)
    })
  }

  constructor() {
    super(`${process.env.VUE_APP_API_ENDPOINT}/device-datas`) 
  }

  deserialize(json: any) {
    if('deviceDatas' in json) {
      return {...json, deviceDatas: json.deviceDatas.map(DeviceDataModel._deserialize)}
    }
    return DeviceDataModel._deserialize(json)
  }
}
