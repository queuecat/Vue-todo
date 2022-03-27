const { default: axios } = require('axios')

const BASE_URL = 'http://localhost:3000'

function Service(baseURL) {
  const service = axios.create({
    baseURL,
    timeout: 10000
  })
  service.interceptors.response.use(
    response => response.data,
    error => Promise.reject(error)
  )
  return service
}
export default Service(BASE_URL)
