const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://api-airbnb-gmqf.onrender.com'
    : 'http://localhost:4000'

export default baseURL
