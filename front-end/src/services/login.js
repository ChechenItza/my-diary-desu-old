import axios from 'axios'

const baseUrl = '/auth'

const auth = async (id, name) => {
  try {
    const res = await axios.post(`${baseUrl}/${id}`, { name })
    return res.data.token
  } catch(error) {
    console.error('Error while authenticating the user')
    return undefined
  }
}

export default { auth }