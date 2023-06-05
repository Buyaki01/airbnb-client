import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { differenceInCalendarDays } from "date-fns"

const BookAccomodation = ({ accomodation }) => {
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [noOfGuests, setNoOfGuests] = useState(1)
  const [name, setName] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const navigate = useNavigate()

  let noOfNights = 0
  if (checkIn && checkOut) {
    noOfNights = differenceInCalendarDays(new Date (checkOut), new Date (checkIn))
  }

  const bookThisPlace = async () => {
    const response = await api.post('/bookings', {accomodationId:accomodation._id, checkIn, 
      checkOut, noOfGuests, name, 
      mobileNumber, price:noOfNights * accomodation.price
    })
    const bookingId = response.data._id
    navigate(`/account/bookings/${bookingId}`)
  }

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">Price: ${accomodation.price} / per night</div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label htmlFor="checkIn"> Check In: </label>
            <input type="date" id="checkIn" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
          </div>
          <div className="py-3 px-4 border-l">
            <label htmlFor="checkOut"> Check Out: </label>
            <input type="date" id="checkOut" value={checkOut} onChange={e => setCheckOut(e.target.value)} />
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          <label htmlFor="noOfGuests"> Number of guests: </label>
          <input type="number" id="noOfGuests" value={noOfGuests} onChange={e => setNoOfGuests(e.target.value)} />
        </div>
      </div>
      {noOfNights > 0 && (
        <div className="py-3 px-4 border-t">
          <label htmlFor="guestName"> Your full name: </label>
          <input type="text" id="guestName" value={name} onChange={e => setName(e.target.value)} />

          <label htmlFor="guestMobile"> Phone Number: </label>
          <input type="tel" id="guestMobile" value={mobileNumber} onChange={e => setMobileNumber(e.target.value)} />
        </div>
      )}
      <button onClick={bookThisPlace} className="primary mt-4"> 
        Book this place 
        {noOfNights > 0 && (
          <span> ${noOfNights * accomodation.price }</span>
        )}
      </button>
    </div>
  )
}

export default BookAccomodation
