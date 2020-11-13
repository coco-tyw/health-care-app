import {Gas, Pressure, Temperature, Humidity, DeviceData, Datetime} from '@/types';

export const getChartData = (items: Gas[] | Pressure[] | Temperature[] | Humidity[]) => {
  const data = [] as number[]
  items.forEach(item => {
    data.push(item.value)
  })
  return data
}

export const getChartLabels = (items: Gas[] | Pressure[] | Temperature[] | Humidity[]) => {
  const labels = [] as string[]
  items.forEach(item => {
    const h = item.createdAt.getHours()
    const m = item.createdAt.getMinutes()
    const s = item.createdAt.getSeconds()
    labels.push(`${h}:${m}:${s}`)
  })
  return labels
}

export const getGasData = (items: DeviceData[]) => {
  const data = [] as Gas[]
  items.forEach(item => {
    data.push({
      id: item.id,
      value: item.gas,
      createdAt: item.createdAt
    })
  })
  return data
}

export const getHumidityData = (items: DeviceData[]) => {
  const data = [] as Humidity[]
  items.forEach(item => {
    data.push({
      id: item.id,
      value: item.humidity,
      createdAt: item.createdAt
    })
  })
  return data
}

export const getPressureData = (items: DeviceData[]) => {
  const data = [] as Pressure[]
  items.forEach(item => {
    data.push({
      id: item.id,
      value: item.pressure,
      createdAt: item.createdAt
    })
  })
  return data
}

export const getTemperatureData = (items: DeviceData[]) => {
  const data = [] as Temperature[]
  items.forEach(item => {
    data.push({
      id: item.id,
      value: item.temperature,
      createdAt: item.createdAt
    })
  })
  return data
}
