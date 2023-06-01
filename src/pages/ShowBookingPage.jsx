import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import AddressLink from "./AddressLink"
import BookingDates from "./BookingDates"
import AccomodationGallery from "./AccomodationGallery"

const ShowBookingPage = () => {
  const { id } = useParams()
  const [booking, setBooking] = useState(null)

  useEffect(() => {
    const showBooking = async () => {
      if (id) {
        try {
          const response = await axios.get(`/bookings/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          setBooking(response.data)
        } catch (error) {
          console.error(error)
        }
      }
    }
    showBooking()
  }, [id])

  if (!booking) {
    return null
  }

  return (
    <div className="my-8">
      <h1 className="text-3xl">{booking.accomodationId.title}</h1>
      <AddressLink accomodation={booking.accomodationId} className="my-2 block" />
      <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-2">Your booking information:</h2>
          <BookingDates booking={booking} />
        </div>
        <div className="bg-primary p-6 text-white rounded-2xl">
          <div>Total Price</div>
          <div className="text-2xl">${booking.price}</div>
        </div>
      </div>
      <AccomodationGallery accomodation={booking.accomodationId} />
    </div>
  )
}

export default ShowBookingPage
