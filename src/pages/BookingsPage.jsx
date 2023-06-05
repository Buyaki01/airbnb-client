import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import BookingDates from "./BookingDates"
import api from "../api/axios"
import jwt_decode from "jwt-decode"

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = jwt_decode(token);
    if (!decodedToken) {
      localStorage.removeItem("token");
      navigate("/login");
    } else {
      const getBookings = async () => {
        try {
          const response = await api.get('/bookings', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          setBookings(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      getBookings();
    }
  }, [navigate]);  

  return (
    <div>
      <div>
        {bookings.length > 0 &&
          bookings.map((booking) => (
            <Link
              to={`/account/bookings/${booking._id}`}
              key={booking._id}
              className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden mt-3"
            >
              <div className="w-48">
                <img
                  className="object-cover"
                  src={`${api.defaults.baseURL}/images/${booking.accomodationId.photos[0]}`}
                  alt=""
                />
              </div>
              <div className="py-3 pr-3 grow">
                <h2 className="text-xl">{booking.accomodationId.title}</h2>
                <div className="text-xl">
                  <BookingDates booking={booking} />
                  <div>
                    <span className="text-2xl">
                      Total price: ${booking.price}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default BookingsPage;
