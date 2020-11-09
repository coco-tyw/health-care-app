export type User = {
  name: string
  password: string
}

export type DeviceData = {
  id: number,
  createdAt: Data,
  deviceName: string,
  temperature: number,
  humidity: number,
  pressure: number,
  gas: number
}
