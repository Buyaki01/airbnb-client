import { differenceInCalendarDays } from "date-fns"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../UserContext"
import api from "../api/axios"
import AddressLink from "./AddressLink"
import AccomodationGallery from "./AccomodationGallery"

const DisplayAccommodationDetailsPage = () => {
  const {id} = useParams()
  const [accomodation, setAccomodation] = useState(null)
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [noOfGuests, setNoOfGuests] = useState(1)
  const [name, setName] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const navigate = useNavigate()
  const {user} = useContext(UserContext)

  useEffect(() => {
    if (user) {
      setName(user.name)
    }
  }, [user])

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
  
  useEffect(() => {
    const showAccomodation = async () => {
      if (!id)
      {
        return
      }
      const response = await api.get(`/accomodation/${id}`)
      setAccomodation(response.data)
    }
    showAccomodation()
  }, [id])

  if(!accomodation) return ''

  return(
    <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
      <h1 className="text-3xl">{accomodation.title}</h1>
      <AddressLink accomodation={accomodation} />
      <AccomodationGallery accomodation={accomodation} />
      <div className="my-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl"> Description </h2>
            {accomodation.description}
          </div>
          Check-In: {accomodation.checkIn} <br/>
          Check-Out: {accomodation.checkOut} <br/>
          Max number of guests: {accomodation.maxGuests}
        </div>
        <div>
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
        </div>
      </div>
      <div className="bg-white -mx-8 px-8 py-8 border-t">
        <div>
          <h2 className="font-semibold text-2xl">Extra Info</h2>
        </div>
        <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">{accomodation.extraInfo}</div>
      </div>
    </div>
  )
}

export default DisplayAccommodationDetailsPage
