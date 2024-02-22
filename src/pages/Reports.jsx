import axios from 'axios'
import { useEffect, useState } from 'react'
import { apiUrls, baseUrl } from '../lib/constants'

export default function Reports() {
  const [data, setData] = useState([])
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
        <h5 className='p-2'>Reports</h5>
        <table className='table table-bordered'>
          <thead>
            <th>Id</th>
            <th>Booking Date</th>
            <th>User Name</th>
            <th>No of Space book</th>
            <th>Parking Date</th>
            <th>Parking Price</th>
          </thead>
          <tbody>
            {data.map((x) => (
              <tr key={x?.bookingId}>
                <td>{x?.bookingId}</td>
                <td>{x?.bookDate}</td>
                <td>{x?.user?.userName}</td>
                <td>{x?.noOfSeats}</td>
                <td>{x?.showDate}</td>
                <td>{x?.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
