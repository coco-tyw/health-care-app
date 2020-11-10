export type User = {
  name: string
  password: string
}

export type DeviceData = {
  id: number,
  createdAt: number,
  deviceName: string,
  temperature: number,
  humidity: number,
  pressure: number,
  gas: number
}

export type Gas = {
  id: number,
  value: number,
  createdAt: number
}

export type Temperature = {
  id: number,
  value: number,
  createdAt: number
}

export type Humidity = {
  id: number,
  value: number,
  createdAt: number
}

export type Pressure = {
  id: number,
  value: number,
  createdAt: number
}
