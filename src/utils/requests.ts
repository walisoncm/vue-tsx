import axios from 'axios'
import store from '@/store'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api base_url
  headers: { 'Access-Control-Allow-Origin': '*' }
})

const err = (error: any) => {
  const { status, data } = error.response
  const { detail } = data

  switch (status) {
    case 400:
      window._VMA.$emit('SHOW_SNACKBAR', {
        show: true,
        text: 'Bad Request ' + data.message,
        color: 'red'
      })
      break

    case 422:
      window._VMA.$emit('SHOW_SNACKBAR', {
        show: true,
        text: detail.map((x: any) => {
          return `${x.loc[1]}: ${x.msg}`
        }).join('\n'),
        color: 'red'
      })

      break

    case 401:
      window._VMA.$emit('AUTH_FAIELD')
      break

    case 403:
      window._VMA.$emit('ACESS_DENIED')
      break

    case 500:
      window._VMA.$emit('SERVER_ERROR')
      break

    default:
      break
  }

  return Promise.reject(error)
}

service.interceptors.request.use(config => {
  config.headers['Access-Control-Allow-Origin'] = '*'
  config.headers['Content-Type'] = config.headers['Content-Type'] || 'application/json'
  config.headers['Access-Control-Allow-Methods'] =
    'POST, GET, OPTIONS, PUT, DELETE'
  config.headers.Authorization =
    'Bearer ' + store.getters['auth/GET_AUTHORIZATION_TOKEN']

  // console.log(config.headers['Content-Type']);

  return config
}, err)

// response interceptor
service.interceptors.response.use(({ data, config }) => {
  if (
    ['put', 'post', 'delete', 'patch'].includes(config.method || '') &&
    data.meta
  ) {
    window._VMA.$emit('SHOW_SNACKBAR', {
      text: data.meta.message,
      color: 'success'
    })
  }

  if (data.error !== undefined) {
    window._VMA.$emit('API_FAILED', data.error)
  }

  return data
}, err)

export default service
