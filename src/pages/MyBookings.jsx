import axios from 'axios'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { apiUrls, baseUrl } from '../lib/constants'
import {findslot, formatDate} from '../lib/util'

export default function MyBookings() {
  // const [data, setData] = useState([])
  const handleCancel = (id) => {
    axios.delete(baseUrl+apiUrls.BOOKINGS_URL + id).then((resp) => {
      Swal.fire({ title: resp.data })
      loadData()
    })
  }
  // const loadData = () => {
  //   axios.get(baseUrl+apiUrls.BOOKINGS_URL).then((resp) => {
  //     setData(resp.data)
  //   })
  // }
  // useEffect(() => {
  //   loadData()
  // }, [])
  const [data, setData] = useState([])
  // const handleCancel = (id) => {
  //   axios
  //     .get(baseUrl+apiUrls.CANCELLED_BOOKING + id)
  //     .then((resp) => {
  //       Swal.fire({ title: resp.data })
  //       loadData()
  //     })
  // }
  const loadData = () => {
    axios
      .get(
        baseUrl+apiUrls.USERS_BOOKINGS +
          sessionStorage.getItem('id')
      )
      .then((resp) => {
        setData(resp.data)
      })
  }
  useEffect(() => {
    loadData()
  }, [])
  return (
    <>
      <div className='container mt-5'>
        <h5 className='p-2'>Booking History</h5>
        <table className='table table-bordered'>
          <thead>
            <th>Id</th>
            <th>Booking Date</th>
            <th>Park Name</th>            
            <th>No of Space book</th>
            <th>Cost</th>
            <th>Parking Date & Time</th>
            <th>Status</th>
            <th>Action</th>
          </thead>
          <tbody>
            {data.map((x) => (
              <tr key={x?.bookingId}>
                <td>{x?.bookingId}</td>
                <td>{formatDate(x?.bookDate)}</td>
                <td>
                  <img className='float-start me-2' src={baseUrl+x?.show?.movie?.poster} style={{width:"100px",height:"100px"}} />
                  {x?.show?.movie?.movieName}<br/>
                  ({x?.show?.movie?.year})<br/>
                  {x?.show?.movie?.actor}<br/>
                  {x?.show?.movie?.director}
                </td>                
                <td>{x?.noOfSeats}</td>
                <td>{x?.cost}</td>
                <td>
                  {formatDate(x?.showDate)}<br/>
                  {findslot(x?.show?.slot)}
                </td>
                <td>{x?.status}</td>
                <td>
                  {x.status === 'Booked' ? (
                    <button
                      onClick={(e) => handleCancel(x.bookingId)}
                      className='btn btn-danger btn-sm'
                    >
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
