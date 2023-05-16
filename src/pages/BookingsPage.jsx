import axios from "axios"
import { differenceInCalendarDays } from "date-fns"
import format from "date-fns/format"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

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
          <Link to={`/account/bookings/${booking._id}`} key={booking._id} className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden">
              <div className="w-48">
                <img className="object-cover" src={`http://localhost:4000/images/${booking.accomodationId.photos[0]}`} alt="" />
              </div>
              <div className="py-3 pr-3 grow">
                <h2 className="text-xl">{booking.accomodationId.title}</h2>
                <div className="flex gap-2 items-center border-t border-gray-300 mt-2 py-2">
                  <div className="flex gap-1 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                    </svg>

                    {format(new Date(booking.checkIn), 'yyyy-MM-dd')} 
                  </div>
                  
                  &rarr; 

                  <div className="flex gap-1 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                    </svg>
                  {format(new Date(booking.checkOut), 'yyyy-MM-dd')}
                  </div>
                </div>
                <div className="text-xl">
                  {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} nights 
                  | Total Price: ${booking.price}
                </div>
              </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default BookingsPage
