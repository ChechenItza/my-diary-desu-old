import axios from 'axios'

import linkGenerator from '../utils/linkGenerator'

const baseUrl = '/entries'

let token = window.localStorage.getItem('user') ? `bearer ${window.localStorage.getItem('user')}` : null
const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const get = async (date) => {
  const url = `${baseUrl}/${linkGenerator.genEntryLink(date)}`
  const config = {
    headers: { Authorization: token },
  }
  try {
    const response = await axios.get(url, config)
    return response.data ? response.data.entry : undefined
  } catch(error) {
    console.error(`Error while getting an entry from the server`)
    return undefined
  }
}

const post = async (date, entry) => {
  const url = `${baseUrl}/${linkGenerator.genEntryLink(date)}`
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(url, { entry }, config)
  return response.data.entry
}

export default { setToken, get, post }