import BaseModel from './BaseModel'

export default class DeviceDataModel extends BaseModel {
  
  static _deserialize(json: any) {
    const datetime = json.createdAt.split('-')
    const Y = Number(datetime[0])
    const M = Number(datetime[1])
    const D = Number(datetime[2])
    const h = Number(datetime[3])
    const m = Number(datetime[4])
    const s = Number(datetime[5])
    return Object.assign(json, {
      createdAt: new Date(Y, M-1, D, h, m, s)
    })
  }

  constructor() {
    super(`${process.env.VUE_APP_API_ENDPOINT}/device-datas`) 
  }

  deserialize(json: any) {
    if('deviceDatas' in json) {
      return {...json, items: json.deviceDatas.map(DeviceDataModel._deserialize)}
    }
    return DeviceDataModel._deserialize(json)
  }
}
