import BaseModel from './BaseModel'

export default class DeviceModel extends BaseModel {
  
  static _deserialize(json: any) {
    return json
  }

  constructor() {
    super(`http://${location.host}/api/devices.json`) 
  }



  deserialize(json: any) {
    if('deviceDatas' in json) {
      return {...json, items: json.deviceDatas.map(DeviceModel._deserialize)}
    }
    return DeviceModel._deserialize(json)
  }
}
