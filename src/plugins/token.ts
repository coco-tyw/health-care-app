import {User} from '@/types'

export const setUser = (user: User) => {
  return localStorage.setItem('user', JSON.stringify(user))
}

export const getAccessToken = () => {
  const user = localStorage.getItem('user') || '""'
  return JSON.parse(user)
}

export const removeAccessToken = () => {
  localStorage.removeItem('user')
}

export const isExpired = () => {
  if (!getAccessToken()) return true
}
