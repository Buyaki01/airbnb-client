const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000'
    : 'https://airbnb-api-omega.vercel.app'

export default baseURL
