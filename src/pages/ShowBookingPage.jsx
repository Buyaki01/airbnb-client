import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import AddressLink from "./AddressLink"

const ShowBookingPage = () => {
  const {id} = useParams()
  const [booking, setBooking] = useState(null)

  useEffect(() => {
    const showBooking = async () => {
      if (id) {
        const response = await axios.get('/bookings')
        const findBooking = response.data.find(({ _id }) => _id === id)
        if (findBooking) {
          setBooking(findBooking)
        }
      }
    }
    showBooking()
  }, [id])

  if (!booking) {
    return ''
  }

  return(
    <div className="my-8">
      <h1>{booking.accomodationId.title}</h1>
      <AddressLink accomodation={booking.accomodationId} className="my-2 block" />
    </div>
  )
}

export default ShowBookingPage
