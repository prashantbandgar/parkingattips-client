import axios from 'axios'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import swal from 'sweetalert2'
import { apiUrls, baseUrl } from '../lib/constants'

export default function Shows() {
  const [data, setData] = useState([])
  const [fromdate, setfromdate] = useState()
  const [todate, settodate] = useState()
  const [slot, setslot] = useState()
  const [price,setprice]=useState()
  const [hallid, sethallid] = useState()
  const [movieid, setmovieid] = useState()
  const [movies, setmovies] = useState([])
  const [halls, sethalls] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (fromdate == undefined) {
      swal.fire({
        title: 'Error',
        icon: 'error',
        text: 'Please fill all details',
      })
      return
    }
    axios
      .post(baseUrl+apiUrls.SHOWS_URL, {
        fromDate: fromdate,
        hallId: hallid,
        movieId: movieid,
        toDate: todate,
        slot,
        price
      })
      .then((resp) => {
        console.log(resp)
        swal.fire({
          title: 'Success',
          text: 'Time added Success',
        })
        setfromdate('')
        setslot('')
        settodate('')
        sethallid('')
        setmovieid('')
        setprice('')
        loadData()
      })
      .catch((err) => {
        swal.fire({
          title: 'error',
          icon: 'error',
          text: 'Cannot save Time',
        })
      })
  }
  const findslot = (id) => {
    switch (id) {
      case 1:
        return '00:00AM to 11:59PM'
      // case 2:
      //   return '12:00PM to 03:00PM'
      // case 3:
      //   return '03:00PM to 06:00PM'
      // case 4:
      //   return '06:00PM to 09:00PM'
      // case 5:
      //   return '09:00PM to 12:00PM'
    }
  }
  const handleDelete = (id) => {
    axios
      .delete('http://localhost:7979/api/shows/' + id)
      .then((resp) => {
        swal.fire({
          icon: 'error',
          title: 'Deleted',
          text: 'Address deleted',
        })
        loadData()
      })
      .catch((err) => {
        swal.fire({
          title: 'Error',
          icon: 'error',
          text: 'Cannot delete address',
        })
      })
  }
  const loadData = () => {
    axios.get(baseUrl+apiUrls.SHOWS_URL).then((resp) => {
      setData(resp.data)
    })    
  }
  useEffect(() => {
    axios.get(baseUrl+apiUrls.MOVIES_URL).then((resp) => {
      setmovies(resp.data)
    })
    axios.get(baseUrl+apiUrls.HALLS_URL).then((resp) => {
      sethalls(resp.data)
    })
    loadData()
  }, [])
  return (
    <>
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-sm-8'>
            <h5 className='p-2'>Parking Time List</h5>
            <table className='table table-bordered'>
              <thead>
                <th>Id</th>
                <th>Parking Name</th>
                <th>Parking Address</th>
                <th>Parking Time</th>
                <th>price</th>
                <th>Date</th>
                <th>Action</th>
              </thead>
              <tbody>
                {data?.map((x) => (
                  <tr key={x?.showId}>
                    <td>{x?.showId}</td>
                    <td>{x?.movie.movieName}</td>
                    <td>{x?.hall.hallDesc}</td>
                    <td>{findslot(x?.slot)}</td>
                    <td>{x?.price}</td>
                    <td>
                      {x?.fromDate} - {x?.toDate}
                    </td>
                    <td>
                      <button
                        onClick={(e) => handleDelete(x.showId)}
                        className='btn btn-danger btn-sm'
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='col-sm-4'>
            <h5>Add Timing</h5>
            <form>
              <div className='mb-2'>
                <label>Park</label>
                <select
                  className='form-control form-control-sm'
                  value={movieid}
                  onChange={(e) => setmovieid(e.target.value)}
                >
                  <option value=''>Select Parking</option>
                  {movies.map((x) => (
                    <option value={x.movieId}>{x.movieName}</option>
                  ))}
                </select>
              </div>
              <div className='mb-2'>
                <label>Parking Address</label>
                <select
                  className='form-control form-control-sm'
                  value={hallid}
                  onChange={(e) => sethallid(e.target.value)}
                >
                  <option value=''>Select Parking address</option>
                  {halls.map((x) => (
                    <option value={x.hallId}>{x.hallDesc}</option>
                  ))}
                </select>
              </div>
              <div className='mb-2'>
                <label>Parking Price</label>
                <input type='number'
                  value={price}
                  placeholder='Parking Price'
                  onChange={(e) => setprice(e.target.value)}
                  className='form-control form-control-sm'
                />                  
              </div>
              <div className='mb-2'>
                <label>From Time</label>
                <select
                  value={slot}
                  onChange={(e) => setslot(e.target.value)}
                  className='form-control form-control-sm'
                >
                  <option value=''>Select Time Slot</option>
                  <option value='1'>00:00AM to 11:59PM</option>
                  {/* <option value='2'>12:00PM to 03:00PM</option>
                  <option value='3'>03:00PM to 06:00PM</option>
                  <option value='4'>06:00PM to 09:00PM</option>
                  <option value='5'>09:00PM to 12:00AM</option> */}
                </select>
              </div>
              <div className='mb-2'>
                <label>From Date</label>
                <input
                  type='date'
                  min={format(new Date(), 'yyyy-MM-dd')}
                  className='form-control form-control-sm'
                  value={fromdate}
                  onChange={(e) => setfromdate(e.target.value)}
                />
              </div>
              <div className='mb-2'>
                <label>To Date</label>
                <input
                  type='date'
                  min={format(new Date(), 'yyyy-MM-dd')}
                  className='form-control form-control-sm'
                  value={todate}
                  onChange={(e) => settodate(e.target.value)}
                />
              </div>
              <button
                onClick={handleSubmit}
                className='btn btn-primary btn-sm float-end'
              >
                Save Details
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
