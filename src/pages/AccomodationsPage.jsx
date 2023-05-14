import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from 'axios'

const AccomodationsPage = () => {
  const [places, setPlaces] = useState([])

  useEffect(() => {
    const getAccomodations = async () => {
      const response = await axios.get('/get-accomodations-for-specific-user')
      setPlaces(response.data)
    }
    getAccomodations()
  }, [])

  return(
    <div>
      <div className="text-center mt-3">
        <Link className="inline-flex bg-primary text-white py-2 px-6 rounded-full" to={'/account/accomodations/new'}> 
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add new Accomodation 
        </Link>
      </div>

      <div className="mt-4">
        {places.length > 0 && places.map(place => (
          <Link to={'/account/accomodations/edit/'+place._id } className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl" key={place._id}>
            <div className="flex w-32 h-32 bg-gray-300 grow flex-shrink-0">
              {place.photos.length > 0 && (
                <img className="object-cover" src={`http://localhost:4000/images/${place.photos[0]}`} alt="" />
              )} 
            </div>
            <div className="flex-grow-0">
              <h2 className="text-xl">{place.title}</h2>
              <p className="text-sm mt-2">{place.description}</p>
            </div>
          </Link>
        )) }
      </div>
    </div>
  )
}

export default AccomodationsPage
