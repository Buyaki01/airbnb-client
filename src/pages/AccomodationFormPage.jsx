import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom";
import PhotosSection from "./PhotosSection";
import FeaturesSection from "./FeaturesSection";

const AccomodationFormPage = () => {
  const {id} = useParams()
  const [title, setTitle] = useState('')
  const [address, setAddress] = useState('')
  const [addPhoto, setAddPhoto] = useState([])
  const [description, setDescription] = useState('')
  const [features, setFeatures] = useState([])
  const [extraInfo, setExtraInfo] = useState('')
  const [checkIn, setCheckIn] = useState(14)
  const [checkOut, setCheckOut] = useState(11)
  const [maxGuests, setMaxGuests] = useState(1)
  const [price, setPrice] = useState(10)
  const navigate = useNavigate()

  useEffect(() => {
    const editAccomodation = async () => {
      if (!id) {
        return
      }
      
      const response = await axios.get(`/accomodation/${id}`)
      if (response.data) {
        const {data} = response
        
        setTitle(data.title)
        setAddress(data.address)
        setAddPhoto(data.photos)
        setDescription(data.description)
        setFeatures(data.features)
        setExtraInfo(data.extraInfo)
        setCheckIn(data.checkIn)
        setCheckOut(data.checkOut)
        setMaxGuests(data.maxGuests)
        setPrice(data.price)
      }
    }
    editAccomodation()
  }, [id])

  const saveAccomodation = async (e) => {
    e.preventDefault()
    const accomodationData = {
      title, address, photos: addPhoto,
      description, features, extraInfo,
      checkIn, checkOut, maxGuests, price
    }
    if (id) {
      await axios.put(`/accomodation/${id}`, { ...accomodationData })
    } else {
      await axios.post('/accomodations', { ...accomodationData })
    }
    navigate('/account/accomodations')
  }
  
  return(
    <>  
      <div>
        <form onSubmit={saveAccomodation}>
          <label htmlFor="title" className="text-2xl mt-4">Title</label>
          <p id="title-description" className="text-gray-500 text-sm my-2"> Please enter the title for your apartment. Make sure it captures the attention of potential guests and accurately reflects the unique qualities of your space</p>
          <input id="title" aria-describedby="title-description" type="text" placeholder="Title, for example: My Lovely Apartment" value={title} onChange={e => setTitle(e.target.value)}/>
          
          <label htmlFor="address" className="text-2xl mt-4">Address</label>
          <p id="address-description" className="text-gray-500 text-sm my-2"> Please enter the address to the location of your appartment, Make sure to include the Name of the Place, the Region/State and the Country.</p>
          <input id="address" aria-describedby="address-description" type="text" placeholder="address" value={address} onChange={e => setAddress(e.target.value)} />
          
          <PhotosSection addPhoto={addPhoto} setAddPhoto={setAddPhoto}/>

          <label htmlFor="description" className="text-2xl mt-4">Description</label>
          <p id="accomodation-description" className="text-gray-500 text-sm my-2"> Kindly describe your accomodation in depth</p>
          <textarea type="" id="description" aria-describedby="accomodation-description" value={description} onChange={e => setDescription(e.target.value)} />

          <FeaturesSection features={features} setFeatures={setFeatures}/>

          <label htmlFor="extraInfo" className="text-2xl mt-4">Extra Info</label>
          <p id="extraInfo-description" className="text-gray-500 text-sm my-2">Kindly add extra information about your accomodation i.e house rules</p>
          <textarea id="extraInfo" aria-describedby="extraInfo-description" value={extraInfo} onChange={e => setExtraInfo(e.target.value)} />

          <label htmlFor="checkInOutGuests" className="text-2xl mt-4"> Check In and out times, maximum guests</label>
          <p id="checkInOutGuests-description" className="text-gray-500 text-sm my-2">Add Check in and out times, remember to have some time window for cleaning the room between guests</p>
          <div id="checkInOutGuests" aria-describedby="checkInOutGuests-description" className="grid gap-2 sm:grid-cols-2">
            <div>
              <h3 className="mt-2">Check In Time</h3>
              <input type="number" placeholder="14" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
            </div>
            
            <div>
              <h3 className="mt-2">Check Out Time</h3>
              <input type="number" placeholder="14" value={checkOut} onChange={e => setCheckOut(e.target.value)}/>
            </div>
            
            <div>
              <h3 className="mt-2">Maximum number of guests</h3>
              <input type="number" placeholder="1" value={maxGuests} onChange={e => setMaxGuests(e.target.value)}/>
            </div>

            <div>
              <h3 className="mt-2">Price per night</h3>
              <input type="number" placeholder="10" value={price} onChange={e => setPrice(e.target.value)}/>
            </div>
          </div>

          <button className="primary my-3">Save</button>
        </form>
      </div>
    </>
  )
}

export default AccomodationFormPage
