import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const IndexPage = () => {
  const [accomodations, setAccomodations] = useState([])

  useEffect(() => {
    const getAllAccomodations = async () => {
      const response = await axios.get('/get-accomodations-for-all-users')
      setAccomodations(response.data)
    }
    getAllAccomodations()
  }, [])

  return(
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
      {accomodations.length > 0 && accomodations.map((accomodation) => (
        <Link to={`/accomodation/${accomodation._id}`} key={accomodation._id}>
          <div className="bg-gray-500 mb-2 rounded-2xl flex"> 
            {accomodation.photos?.[0] && (
              <img className="rounded-2xl object-cover aspect-square" src={`https://api-airbnb-gmqf.onrender.com/images/${accomodation.photos?.[0]}`} alt="" />
            )}
          </div>
          <h2 className="font-semibold">{accomodation.address}</h2>
          <h3 className="text-gray-700" >{accomodation.title}</h3>
          <div className="mt-1">
            <span className="font-semibold">${accomodation.price}</span> per night
          </div>
        </Link>
      ))}
    </div>
  )
}

export default IndexPage