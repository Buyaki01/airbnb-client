import axios from "axios"
import { useEffect, useState } from "react"

const BookingsPage = () => {
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    const getBookings = async () => {
      const response = await axios.get('/bookings')
      setBookings(response.data)
    }
    getBookings()
  }, [])

  return(
    <div>
      <div className="">
        {bookings?.length > 0 && bookings.map(booking => (
          <div>
            {booking.checkIn}
          </div>
        ))}
      </div>
    </div>
  )
}

export default BookingsPage
