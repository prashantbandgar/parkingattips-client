import { useEffect, useState } from 'react';
import axios from 'axios';
import SearchResult from './SearchResult';
import { apiUrls, baseUrl } from '../lib/constants';
import Swal from 'sweetalert2';
export default function Carouselslide() {
  const [halls,sethalls]=useState([])
  const [date,setdate]=useState('')
  const [movieName,setmovieName]=useState('')
  const [slot,setslot]=useState(0)
  const [hallId,sethallId]=useState(0)
  const [data,setData]=useState([])
  const handleSearch=e=>{
      e.preventDefault()
      if(hallId || date || movieName || slot)
      {
        axios.get(baseUrl+apiUrls.SEARCH_SHOWS+'?hallId='+hallId+"&date="+date+"&movieName="+movieName+"&slot="+slot).then((resp) => {
        setData(resp.data)   
      })
    }
    else{
      Swal.fire('Error','Please select any one parameter')
    }
  }
  useEffect(()=>{
    axios.get(baseUrl+apiUrls.HALLS_URL)
    .then(resp=>{
      sethalls(resp.data)
    }).catch(err=>{
      console.log(err)
    })
    axios.get(baseUrl+apiUrls.TODAYS_SHOWS).then((resp) => {
      setData(resp.data)
    })
  },[])
  return (
    <>
    <div className='mt-5'>
      <div className="d-block w-100"
      style={{height:"500px",backgroundImage:"url('https://lovehastings.com/wp-content/uploads/2018/12/Car-park.jpg')",backgroundSize:"100% 100%"}}>

         {/* style={{height:"500px",backgroundImage:"url('header.jpg')",backgroundSize:"100% 100%"}}> */}
           <form className="d-block mx-auto" style={{width:"80%",position:"absolute",top:"44%",left:"50%",transform:"translate(-50%,-50%)"}}>
             <div className='row'>
                <div className='col-sm-3'>
                <select className="form-control me-2" value={slot} onChange={e=>setslot(e.target.value)}>
                  <option value=''>Select Time Slot</option>
                  <option value='1'>00:00AM to 11:59PM</option>
                  </select>
                </div>
               <div className='col-sm-2'>
                <select className="form-control me-2" value={hallId} onChange={e=>sethallId(e.target.value)}>
                    <option value="">Select Parking Address</option>
                    {halls.map(x=>(
                    <option value={x.hallId}>{x.hallDesc}</option>
                    ))}
                </select>
                </div>
                <div className='col-sm-3'>
                <input type='search' placeholder='Park name here' className="form-control me-2" value={movieName} onChange={e=>setmovieName(e.target.value)}/>
                </div>
                <div className='col-sm-3'>
                <input type="date" className='form-control me-2' value={date} onChange={e=>setdate(e.target.value)} />
                </div>                
                <div className='col-sm-1'>
                <button onClick={handleSearch} className="btn btn-warning bg-gradient text-white" type="submit"><i className="fa fa-search"></i></button>
                </div>
                </div>
            </form>
         </div>
    </div>
    <SearchResult data={data} />
    </>
  );
}
