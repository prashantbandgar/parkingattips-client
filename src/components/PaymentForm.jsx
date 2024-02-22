import axios from "axios"
import { useState } from "react"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"

export default function PaymentForm(item){
    console.log(item)
    const [cardno,setcardno]=useState()
    const [nameoncard,setnameoncard]=useState()
    const [amount,setamount]=useState()
    const navigate=useNavigate()
    const handleSubmit=e=>{
        e.preventDefault()        
        const data={
            "apid":item?.id?.id,
            "userid":sessionStorage.getItem("id"),
            "cardno":cardno,
            "nameoncard":nameoncard,
            "amount":amount    
        }

        axios.post('http://localhost:7979/api/bookings',data)
        .then(resp=>{
            Swal.fire({title:resp.data})
            navigate("/")
        })
        .catch(error=>{
            Swal.fire({title:error.response.data})        
        })
    }
    
    return(
        <>
            <h5>Payment Details</h5>
            <form>
                  <div>
                    <div className="mb-3 row">
                        <label className="col-sm-4 col-form-label">Card No</label>
                        <div className="col-sm-8">
                        <input type="text" onChange={e=>setcardno(e.target.value)} maxLength={16} minLength={16} className="form-control"/>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label className="col-sm-4 col-form-label">Name on Card</label>
                        <div className="col-sm-8">
                        <input type="text" onChange={e=>setnameoncard(e.target.value)} className="form-control"/>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label className="col-sm-4 col-form-label">Rent</label>
                        <div className="col-sm-8">
                        <input type="number" value={item?.id?.rent} disabled className="form-control"/>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label className="col-sm-4 col-form-label">Electricity Bill</label>
                        <div className="col-sm-8">
                        <input type="number" value={item?.id?.lightbill} disabled className="form-control"/>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label className="col-sm-4 col-form-label">Booking Amount</label>
                        <div className="col-sm-8">
                        <input type="number" min={100} onChange={e=>setamount(e.target.value)} max={item?.id?.rent+item?.id?.lightbill} className="form-control"/>
                        </div>
                    </div>
                    <button onClick={handleSubmit} className="btn btn-primary float-end">Pay Now</button>
                </div>
            </form>
        </>
    )
}