import axios from 'axios'
import { format, parse } from 'date-fns'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { apiUrls, baseUrl } from '../lib/constants'
import { findslot } from '../lib/util'
import SeatSelect from './SeatSelect'

export default function Booknow() {
  const { id } = useParams()
  const navigate=useNavigate()
  const userid = sessionStorage.getItem('id')
  const [cost, setcost] = useState()
  const [occupied,setoccupied]=useState([])
  const [showdate, setshowdate] = useState(format(new Date(), 'yyyy-MM-dd'))
  const [seattype, setseattype] = useState()
  const [seatnos,setseatnos]=useState([])
  const [show, setshow] = useState()
  const handleSubmit = (e) => {
    e.preventDefault()
    if(cost===undefined || seatnos===undefined || seatnos.length===0)
    {
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: 'Please fill all details',
      })
      return;
    }
    axios
      .post(baseUrl+apiUrls.BOOKINGS_URL, {
        showId: show.showId,
        userId: parseInt(userid),
        cost: cost,
        showDate: showdate,
        noOfSeats: seatnos.length,
        seatnums:seatnos
      })
      .then((resp) => {
        Swal.fire({ title: 'Success', text: resp.data })
        navigate('/mybookings')
      })
      .catch((err) => {
        Swal.fire({ title: 'Error', text: err.response.data })
      })
  }

  const loadShowBookings=()=>{
    axios
    .get(baseUrl+apiUrls.CHECK_SHOWS_BOOKING_URL+'?showid=' + id+'&date='+showdate)
    .then((resp) => 
    {
      if(resp.data.length>0){
        const seatsoccupieds=[]
        for(let row of resp.data.filter(x=>x.status!='Cancelled')){
          //console.log("data",row.seatnos)
          const seatocc=row?.seatnos?.split(`,`).map(x=>+x)
          console.log("seats",seatocc)
          seatsoccupieds.push(...seatocc)
        }
        console.log("occupieds",seatsoccupieds)
        setoccupied(seatsoccupieds)
      }
      else{
        setoccupied([])
      }
    })
    .catch((err) => console.log(err.response.data))
  }

  useEffect(()=>{
    loadShowBookings()
  },[showdate])

  useEffect(() => {  
    const totalcost=seatnos.length * show?.price  
    setcost((value) => totalcost |0)
  }, [ seatnos])

  
  useEffect(() => {
    axios
      .get(baseUrl+apiUrls.SHOWS_URL + id)
      .then((resp) => setshow(resp.data))
      .catch((err) => console.log(err.response.data))

    loadShowBookings()
  }, [])
  return (
    <>
      <div className='container mt-5'>
        <h4>Parking Booking </h4>
        <div className='row'>
          <div class='col-sm-3'>
            <div className='card'>
              <img
                src={'http://localhost:7979/' + show?.movie.poster}
                className='card-img-top'
              />
              <div className='card-body text-center'>
                <h6>{show?.movie.movieName} ({show?.movie.year})</h6>
                <h6>{show?.movie.description}</h6>
                <h6>Parking owner name: {show?.movie.actor}</h6>
                <h6>Parking worker name: {show?.movie.actress}</h6>
                <h6>Parking facility: {show?.movie.director}</h6><hr/>
                <h6>Parking Address : {show?.hall.hallDesc}</h6>
                <h6>Time Slot: {findslot(show?.slot)}</h6>
              </div>
            </div>
          </div>
          <div className='col-sm-4'>
            <form>
              <div className='mb-2'>
                <label>Select Parking Date</label>
                <input
                  type='date'
                  min={format(new Date(), 'yyyy-MM-dd')}
                  value={showdate}
                  onChange={(e) => setshowdate(e.target.value)}
                  className='form-control'
                />
              </div>
              <div className='mb-2'>
                <label>Parking Price</label>
                <input type='text' value={show?.price} className='form-control'/>
              </div>
              <div className='mb-2'>
                <label>Space Numbers</label>
                <input
                  type='text'                  
                  readOnly
                  value={seatnos}                  
                  className='form-control'
                />
              </div>
              <div className='mb-2'>
                <label>No Of Space book</label>
                <input
                  type='number'
                  min={1}
                  readOnly
                  value={seatnos.length}
                  className='form-control'
                />
              </div>
              <div className='mb-2'>
                <label>Total Cost</label>
                <input
                  type='text'
                  disabled
                  value={cost}
                  className='form-control'
                />
              </div>
              <button
                onClick={handleSubmit}
                className='btn btn-primary float-end'
              >
                Book Now
              </button>
            </form>
          </div>
          <div className='col-sm-4'>
            <SeatSelect occupied={occupied} setseatnos={setseatnos}/>
          </div>
        </div>
      </div>
    </>
  )
}
