import React, { useState } from 'react'
import axios from 'axios'
import '../components/3.css'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert2'
import { apiUrls, baseUrl } from '../lib/constants'

export default function CustomerRegister() {
  return (
    <div>
      <CustomerTable />
    </div>
  )
}

function CustomerTable() {
  const navigate = useNavigate()
  const [fname, setfname] = useState('')
  const [lname, setlname] = useState('')
  const [email, setemail] = useState('')
  const [phone, setphones] = useState('')
  const [password, setpassword] = useState('')

  const handleForm = (e) => {
    e.preventDefault()
    if (!validateEmail(email)) {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'please enter valid email address!',
      })
    }
    else if (!validateFirstName(fname)) {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'please enter valid First name',
      })
    }
    else if (!validateLastName(lname)) {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'please enter valid last name',
      })
    }
     else if (!validateMobile(phone)) {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'please enter valid 10 digit Contact Number',
      })
    } else if (password === '') {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'please enter password',
      })
    } else if (password.length < 6 || password.length > 15) {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Password length is min 6 and max length is 15',
      })
    } 
    else {
      submit()
    }
  }
  const submit = async () => {
    await axios
      .post(baseUrl+apiUrls.REGISTER_URL, {
        userName: fname + ' ' + lname,
        email: email,
        password: password,
        mobile: phone,
      })
      .then((resp) => {
        swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registered Successfully',
          showConfirmButton: false,
          timer: 1500,
        })
        navigate('/login')
      })
      .catch((error) => {
        swal.fire({
          position: 'center',
          icon: 'error',
          title: error.response.data,
          showConfirmButton: false,
          timer: 1500,
        })
      })
  }
  
  const validateFirstName = (fname) => {
    // Regex for first name validation
    const regex = /^[a-zA-Z]+$/;
    return regex.test(fname);
  };

  const validateLastName = (lname) => {
    // Regex for last name validation
    const regex = /^[a-zA-Z]+$/;
    return regex.test(lname);
  };

  const validateEmail = (email) => {
    // Regex for email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const validateMobile = (mobile) => {
    // Regex for 10-digit mobile number validation
    const regex = /^\d{10}$/;
    return regex.test(mobile);
  };
  
  return (
    <div className='container' style={{ width: '70%', marginTop: '100px' }}>
      <div className='title text-center'>User Registration Form</div>
      <form>
        <div className='user-details'>
          <div className='input-box'>
            <span className='details'>First Name</span>
            <input
              type='text'
              placeholder='Enter first name'
              value={fname}
              onChange={(e) => setfname(e.target.value)}
              required
            />
          </div>
          <div className='input-box'>
            <span className='details'>Last Name</span>
            <input
              type='text'
              placeholder='Enter last name'
              value={lname}
              onChange={(e) => setlname(e.target.value)}
              required
            />
          </div>
          <div className='input-box'>
            <span className='details'>Mobile Number</span>
            <input
              type='text'
              maxLength={10}
              minLength={10}
              placeholder='Enter your number'
              id='mobileNo'
              value={phone}
              onChange={(e) => setphones(e.target.value)}
              required
            />
          </div>

          <div className='input-box'>
            <span className='details'>Email</span>
            <input
              type='email'
              placeholder='Enter your email'
              id='emailid'
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
            />
          </div>
          <div className='input-box'>
            <span className='details'>Password</span>
            <input
              type='password'
              placeholder='Enter your password'
              id='password'
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className='button' style={{ margin: 'auto' }}>
          <input
            type='submit'
            className='bg-info bg-gradient'
            value='Submit'
            onClick={handleForm}
          />
        </div>
      </form>
    </div>
  )
}
