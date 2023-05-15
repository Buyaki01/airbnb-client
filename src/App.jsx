import { Route, Routes } from 'react-router-dom'
import './App.css'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import Layout from './Layout'
import RegisterPage from './pages/RegisterPage'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import ProfilePage from './pages/ProfilePage'
import AccomodationsPage from './pages/AccomodationsPage'
import BookingsPage from './pages/BookingsPage'
import AccomodationFormPage from './pages/AccomodationFormPage'
import DisplayAccommodationDetailsPage from './pages/DisplayAccommodationDetailsPage'

axios.defaults.baseURL = 'http://localhost:4000'
axios.defaults.withCredentials = true

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<IndexPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/account/profile' element={<ProfilePage/>}/>
          <Route path='/account/bookings' element={<BookingsPage/>}/>
          <Route path='/account/accomodations' element={<AccomodationsPage/>}/>
          <Route path='/account/accomodations/new' element={<AccomodationFormPage/>}/>
          <Route path='/account/accomodations/edit/:id' element={<AccomodationFormPage/>}/>
          <Route path='/accomodation/:id' element={<DisplayAccommodationDetailsPage/>}/>
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
