import axios from 'axios'
import { useEffect, useState } from 'react'
import swal from 'sweetalert2'
import { apiUrls, baseUrl } from '../lib/constants'

export default function Address() {
  const [data, setData] = useState([])
  const [hallDesc, sethallDesc] = useState()
  const [capacity, setcapacity] = useState(1)
  const [showadd, setshowadd] = useState(true)
  const [showseat, setshowseat] = useState(false)
  const [hall, sethall] = useState()
  const [seattypes, setseattypes] = useState([])
  const [seattypeid, setseattypeid] = useState()
  const [seatcount, setseatcount] = useState()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (hallDesc == undefined) {
      swal.fire({
        title: 'Error',
        icon: 'error',
        text: 'Please fill all details',
      })
      return
    }
    axios
      .post(baseUrl+apiUrls.HALLS_URL, {
        hallDesc: hallDesc,
        capacity: capacity,
      })
      .then((resp) => {
        console.log(resp)
        swal.fire({
          title: 'Success',
          text: 'Park Address added success',
        })
        sethallDesc('')
        setcapacity('')
        loadData()
      })
      .catch((err) => {
        swal.fire({
          title: 'error',
          icon: 'error',
          text: 'Cannot save Address',
        })
      })
  }
  
  const handleDelete = (id) => {
    axios
      .delete(baseUrl+apiUrls.HALLS_URL + id)
      .then((resp) => {
        swal.fire({
          icon: 'error',
          title: 'Deleted',
          text: 'address deleted',
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
    axios.get(baseUrl+apiUrls.HALLS_URL).then((resp) => {
      setData(resp.data)
    })
  }
  useEffect(() => {
    loadData()
  }, [])
  return (
    <>
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-sm-8'>
            <h5 className='p-2'>Address List</h5>
            <table className='table table-bordered'>
              <thead>
                <th>Id</th>
                <th>Parking Address</th>
                <th>Vehical Capacity</th>
                <th>Action</th>
              </thead>
              <tbody>
                {data?.map((x) => (
                  <tr key={x?.hallId}>
                    <td>{x?.hallId}</td>
                    <td>{x?.hallDesc}</td>
                    <td>{x?.capacity}</td>                    
                    <td>
                      <button
                        onClick={(e) => handleDelete(x.hallId)}
                        className='btn btn-danger btn-sm me-2'
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
            {showadd && (
              <div className='card'>
                <div className='card-header text-center'>
                  <h5>Add Parking Address</h5>
                </div>
                <div className='card-body'>
                  <form>
                    <div className='mb-2'>
                      <label>Parking Address</label>
                      <input
                        type='text'
                        className='form-control form-control-sm'
                        value={hallDesc}
                        onChange={(e) => sethallDesc(e.target.value)}
                      />
                    </div>
                    <div className='mb-2'>
                      <label>Vehical Capacity</label>
                      <input
                        type='number'
                        min='1'                        
                        className='form-control form-control-sm'
                        value={capacity}
                        onChange={(e) => setcapacity(e.target.value)}
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
            )}

          </div>
        </div>
      </div>
    </>
  )
}
