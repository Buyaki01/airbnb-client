import axios from "axios"
import { differenceInCalendarDays } from "date-fns"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const DisplayAccommodationDetailsPage = () => {
  const {id} = useParams()
  const [accomodation, setAccomodation] = useState(null)
  const [showAllPhotos, setShowAllPhotos] = useState(false)
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
    const response = await axios.post('/bookings', {accomodationId:accomodation._id, checkIn, 
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
      const response = await axios.get(`/accomodation/${id}`)
      setAccomodation(response.data)
    }
    showAccomodation()
  }, [id])

  if(!accomodation) return ''

  if (showAllPhotos) {
    return(
      <div className="absolute inset-0 bg-white min-h-screen"> 
        <div className="p-8 grid gap-4">
          <div>
            <button onClick={() => setShowAllPhotos(false)} className="fixed bg-transparent py-2 px-4 rounded-2xl"> 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
          </div>
          {accomodation?.photos?.length > 0 && accomodation.photos.map(photo => (
            <div> 
              <img className="min-w-full object-cover" src={`http://localhost:4000/images/${photo}`} alt="" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return(
    <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
      <h1 className="text-3xl">{accomodation.title}</h1>
      <a className="flex gap-1 my-3 block font-semibold underline" target="_blank" href={`https://maps.google.com/?q=${accomodation.address}`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
        {accomodation.address}
      </a>
      <div className="relative">
        <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden">
          <div>
            {accomodation.photos?.[0] && (
              <div>
                <img onClick={() => setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover" src={`http://localhost:4000/images/${accomodation.photos?.[0]}`} alt="" />
              </div>
            )}
          </div>
          <div className="grid">
            {accomodation.photos?.[1] && (
              <img onClick={() => setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover" src={`http://localhost:4000/images/${accomodation.photos?.[1]}`} alt="" />
            )}

            <div className="overflow-hidden">
              {accomodation.photos?.[2] && (
                <img onClick={() => setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover relative top-2" src={`http://localhost:4000/images/${accomodation.photos?.[2]}`} alt="" />
              )}
            </div>
          </div>
        </div>
        <button onClick={() => setShowAllPhotos(true)} className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow shadow-md shadow-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
          </svg>
          Show more photos
        </button>
      </div>

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
