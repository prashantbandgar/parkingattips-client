import { format, parse } from 'date-fns'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { baseUrl } from '../lib/constants'

export default function SearchResult(props) {
  const data = props.data
  const state = useSelector((state) => state)
  console.log('LoggedIn ', state.loggedin.IsLoggedIn)
  const findslot = (id) => {
    switch (id) {
      case 1:
        return '00:00AM to 11:59PM,'
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
  const isuser =
    state.loggedin.IsLoggedIn && sessionStorage.getItem('role') === 'User'
      ? true
      : false
  return (
    <div className='mx-auto my-2 bg-white' style={{ width: '95%' }}>
      <h5 className='p-2 text-center'>Park List</h5>
      {data.length > 0 ? (
        <table className='table table-bordered table-responsive'>
          <thead>
            <tr>
              <th>Parking Name</th>
              <th>Time Slot</th>
              <th>Parking Address Details</th>
              <th>Parking Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((x) => (
              <tr key={x?.showId}>
                <td>
                  <img
                    style={{
                      width: '80px',
                      height: '100px',
                      marginRight: '10px',
                    }}
                    src={baseUrl + x?.movie.poster}
                  />
                  {x?.movie.movieName}
                </td>
                <td>{findslot(x?.slot)}</td>
                <td>{x?.hall.hallDesc}</td>
                <td>
                  {format(
                    parse(x?.fromDate, 'yyyy-MM-dd', new Date()),
                    'dd-MMM-yyyy'
                  )}
                  -
                  {format(
                    parse(x?.toDate, 'yyyy-MM-dd', new Date()),
                    'dd-MMM-yyyy'
                  )}
                </td>
                <td>
                  {isuser && (
                    <Link
                      to={'book/' + x?.showId}
                      className='btn btn-danger btn-sm'
                    >
                      Book Now
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h5 className='text-center p-2'>No Parking found</h5>
      )}
    </div>
  )
}
