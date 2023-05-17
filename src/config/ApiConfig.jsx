const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000'
    : 'https://api-airbnb-gmqf.onrender.com'

export default baseURL
