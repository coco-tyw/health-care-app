import {Gas, Pressure, Temperature, Humidity, DeviceData} from '@/types';

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
    const s = item.createdAt % 100
    const m = (item.createdAt - s) / 100 % 100
    const h = (item.createdAt - m*100 - s) / 10000 % 100
    const D = (item.createdAt - h*10000 - m*100 - s) / 1000000 % 100
    const M = (item.createdAt - D*1000000 - h*10000 - m*100 - s) / 100000000 % 100
    const Y = (item.createdAt - M*100000000 - D*1000000 - h*10000 - m*100 - s) / 10000000000 % 10000
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
