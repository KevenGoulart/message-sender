import { env } from '@/services/env'
import axios from 'axios'

const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL
})

export default api
