import { useState } from "react"
import baseURL from "../config/ApiConfig"

const AccomodationGallery = ({accomodation}) => {
  const [showAllPhotos, setShowAllPhotos] = useState(false)
  if (!accomodation) {
    return null
  }

  const {photos} = accomodation

  if (showAllPhotos) {
    return(
      <div className="absolute inset-0 bg-white min-h-screen"> 
        <div className="p-8 grid gap-4">
          <div>
            <button onClick={() => setShowAllPhotos(false)} className="fixed bg-transparent py-2 px-4 rounded-2xl"> 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
          </div>
          {accomodation?.photos?.length > 0 && accomodation.photos.map((photo, index) => (
            <div key={index}> 
              <img className="min-w-full object-cover" src={`${baseURL}/images/${photo}`} alt="" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return(
    <div className="relative">
      <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden">
        <div>
          {photos?.[0] && (
            <div>
              <img onClick={() => setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover" src={`${baseURL}/images/${accomodation.photos?.[0]}`} alt="" />
            </div>
          )}
        </div>
        <div className="grid">
          {photos?.[1] && (
            <img onClick={() => setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover" src={`${baseURL}/images/${accomodation.photos?.[1]}`} alt="" />
          )}

          <div className="overflow-hidden">
            {photos?.[2] && (
              <img onClick={() => setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover relative top-2" src={`${baseURL}/images/${accomodation.photos?.[2]}`} alt="" />
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
  )
}

export default AccomodationGallery
