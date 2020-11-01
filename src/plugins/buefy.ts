import Vue from 'vue'
import Buefy from 'buefy'
import dayjs from 'dayjs'

Vue.use(Buefy, {
  defaultDateFormatter: (date: any) => dayjs(date).format('YYYY/MM/DD'),
  defaultTimeFormatter: (date: any) => dayjs(date).format('HH:mm'),
  defaultDatetimeFormatter: (date: any) => dayjs(date).format('YYYY/MM/DD HH:mm'),
  defaultIconPack: 'fas'
})
