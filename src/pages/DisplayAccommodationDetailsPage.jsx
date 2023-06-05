import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { UserContext } from "../UserContext"
import AddressLink from "./AddressLink"
import AccomodationGallery from "./AccomodationGallery"
import api from "../api/axios"
import BookAccomodation from "./BookAccomodation"

const DisplayAccommodationDetailsPage = () => {
  const {id} = useParams()
  const [accomodation, setAccomodation] = useState(null)
  const {user} = useContext(UserContext)

  useEffect(() => {
    if (user) {
      setName(user.name)
    }
  }, [user])
  
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
          <BookAccomodation accomodation={accomodation}/>
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
