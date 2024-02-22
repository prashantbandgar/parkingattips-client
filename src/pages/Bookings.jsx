import axios from 'axios'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { apiUrls, baseUrl } from '../lib/constants'

export default function Bookings() {
  const [data, setData] = useState([])
  const handleCancel = (id) => {
    axios.delete(baseUrl+apiUrls.BOOKINGS_URL + id).then((resp) => {
      Swal.fire({ title: resp.data })
      loadData()
    })
  }
  const loadData = () => {
    axios.get(baseUrl+apiUrls.BOOKINGS_URL).then((resp) => {
      setData(resp.data)
    })
  }
  useEffect(() => {
    loadData()
  }, [])
  return (
    <>
      <div className='container mt-5'>
        <h5 className='p-2'>All Bookings</h5>
        <table className='table table-bordered'>
          <thead>
            <th>Id</th>
            <th>Booking Date</th>
            <th>Parking Name</th>
            <th>User Name</th>
            <th>No of space book</th>
            <th>Parking Date</th>
            <th>Status</th>
            <th>Action</th>
          </thead>
          <tbody>
            {data.map((x) => (
              <tr key={x?.bookingId}>
                <td>{x?.bookingId}</td>
                <td>{x?.bookDate}</td>
                <td>{x?.show?.movie?.movieName}</td>
                <td>{x?.user?.userName}</td>
                <td>{x?.noOfSeats}</td>
                <td>{x?.showDate}</td>
                <td>{x?.status}</td>
                <td>
                  {x.status === 'Booked' ? (
                    <button
                      onClick={(e) => handleCancel(x.bookingId)}
                      className='btn btn-danger btn-sm'>
                      Cancel Booking
                    </button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
