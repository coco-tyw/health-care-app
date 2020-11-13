export type User = {
  name: string
  password: string
}

export type DeviceData = {
  id: number,
  createdAt: Date,
  deviceName: string,
  temperature: number,
  humidity: number,
  pressure: number,
  gas: number
}

export type Device = {
  id: number,
  online: boolean,
  name: string,
  deviceName: string | null
  situation: string
  batteryPercent: number | null
}

export type Gas = {
  id: number,
  value: number,
  createdAt: Date
}

export type Temperature = {
  id: number,
  value: number,
  createdAt: Date
}

export type Humidity = {
  id: number,
  value: number,
  createdAt: Date
}

export type Pressure = {
  id: number,
  value: number,
  createdAt: Date
}

export type Datetime = {
  Y: number
  M: number
  D: number
  h: number
  m: number
  s: number
}
