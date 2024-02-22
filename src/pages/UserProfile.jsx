import axios from 'axios'
import { useEffect, useState } from 'react'
import { apiUrls, baseUrl } from '../lib/constants'

export default function UserProfile() {
  const [data, setData] = useState()
  useEffect(() => {
    axios
      .get(baseUrl+apiUrls.USERS_LIST + sessionStorage.getItem('id'))
      .then((resp) => {
        setData(resp.data)
      })
  }, [])
  return (
    <>
      <div className='container mt-5'>
        <h4>User Profile {data?.userName}</h4>
        <table className='table table-bordered mt-4'>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>
                {data?.userName}
              </th>
            </tr>
            <tr>
              <th>User name</th>
              <th>{data?.email}</th>
            </tr>
            <tr>
              <th>Phone no</th>
              <th>{data?.mobile}</th>
            </tr>
            <tr>
              <th>Email Id</th>
              <th>{data?.email}</th>
            </tr>            
          </thead>
        </table>
      </div>
    </>
  )
}
