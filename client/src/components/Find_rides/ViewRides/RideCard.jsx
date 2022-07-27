import React ,{useState,useEffect,useContext} from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Rating } from "@mui/material";
import { Link } from 'react-router-dom';
import axios from "axios";

import { toastError, toastSuccess } from './../../../Toastsuccess';

export default function RideCard({ride,socket}) {
    const { user:currentuser  } = useContext(AuthContext);
    const [clicked, setClicked] = useState(false);


 //join 
const handelRequest = (driverid,rideid,type)=>{
  axios.put('http://localhost:5000/api/rides/join_ride', {driverid,rideid}).then( async(res) => {
  console.log(res);
  console.log(res.status);
  if(res.status === 200){
    const msg = `${currentuser.fullname} Joined your ride`;
    await  axios.post('http://localhost:5000/api/notify/notify_driver',{driverid,msg}).then(res=>{
      toastSuccess("notification has been sent");
    })
  }
}).catch((err) => {
  toastError("failed")
});
    socket.emit("sendNotification", {
      senderName: currentuser.fullname,
      receiverName: ride.userid.fullname,
      userid:currentuser._id,
      type,
    });
}
  return (
    <div classNameName="view-rides" id="viewride" >
                  <div className="container px-4 py-5 mx-auto">
                    <div className="row ">
                      <div className="card card2">
                        <div className="row ">
                          <div className="col-4 d-flex">
                            <img
                              className="profile-pic col-2 mx-2"
                              src={`http://localhost:5000/${ride.userid.profileimg}`}
                            />
                             <Link className="text-primary" to={`/profile/${ride.userid._id}`} style={{textDecoration:"none"}}>
                            <h3 className="mt-2 font-weight-normal">{ride.userid.fullname}</h3>
                            </Link>
                          </div>
                          <div className="col-8 d-flex justify-content-end">
                            <h5 className="text-primary">{ride.fare} EGP</h5>
                          </div>
                        </div>
                        <div className="row ">
                          <div className="col-1"></div>
                          <div className="col-5">
                            <Rating name="read-only" value={+ride.userid.rate === "NaN"? 0:ride.userid.rate} readOnly precision={0.5} style={{marginTop: "-2em"}} />
                          </div>
                          <div className="col-6 d-flex justify-content-end ">
                            <h5 className="text-muted">
                              <i className="fa-solid fa-users-between-lines"></i>
                              {ride.seats} Availble Seats
                            </h5>
                          </div>
                        </div>
            
                        <div className="row my-2">
                          <div className="d-flex">
                            <h6 className="text-primary">
                              <i className="fa fa-location"></i> From
                            </h6>
                            <h6 className="lead text-muted mx-4">{ride.from}</h6>
                            <h6 className="text-primary">
                              <i className="fa-solid fa-location-dot"></i> To
                            </h6>
                            <h6 className="lead text-muted mx-4">{ride.to}</h6>
                          </div>
                          <div className="col-md-4"></div>
                        </div>
  
  
                        <div className="row mt-5" >
                       
                          <div className="col" id="fa-lg">
                            {ride.gender == "men" ? (
                              <i className="fa-solid fa-person"></i>
                            ) : (
                              <i className="fa-solid fa-person-dress"></i>
                            )}
                            {ride.air_condition === "air-condition" ? (
                              <i className="fa-solid fa-fan"></i>
                            ) : (
                              " "
                            )}
                            {ride.payment === "card" ? (
                              <i className="fa-regular fa-credit-card"></i>
                            ) : (
                            <i className="fa-regular fa-money-bill-1"></i>
                            )}
                            {ride.smoking === "no-smoking" ? (
                              <i className="fa-solid fa-ban-smoking"></i>
                            ) : (
                              ""
                            )}
            
                            {ride.pet === "no-pet" ? (
                                <>
                                <i className="fa-solid fa-cat"></i>
                                <i className="fa-solid fa-ban"></i>
                                </>
                            ) : (
                                " "
                            )}
                            {ride.pet === "no-pet" ? (
                              <i className="fa-solid fa-fan"></i>
                            ) : (
                              " "
                            )}
                          </div>
                          <div className="col">
                            <i className="fa-solid fa-calendar-days"></i>
                            <span> {(ride.date).slice(0,10).replace(/--/g,"")}</span>
                            <span> | </span>
                            <i className="fa-regular fa-clock"></i>
                            <span> {ride.time}</span>
                          </div>
                          <div className="col">
                            <i className="fa-solid fa-map-location"></i>
                            <span> {ride.distance} </span>
                          </div>
                          <div className="col">
                            <i className="fa-regular fa-clock"></i>
                            <span> {ride.duration}</span>
                          </div>
  
                          {
                              (ride.userid._id !== currentuser._id)?
                            <div className="col d-flex justify-content-end">
                          
                            <button type="button" className="btn btn-warning mx-2"                        
                            >
                            <i className="fa-solid fa-comment-dots fa-lg text-light"></i>
                            </button>
                            <button type="button" className="btn btn-primary mx-2"
                             onClick={()=>{
                                setClicked(!clicked)
                                handelRequest(ride.userid._id,ride._id,1)
                            }}
                             disabled={clicked}
                            style={ clicked? {cursor: "pointer"} : {cursor: " not allowed"}}
                             >
                                {
                                    clicked? 
                                    <span>sent</span>
                                    :
                                    <i className="fa-solid fa-handshake-simple fa-lg text-light"></i>

                                }
                                                        </button>
                             </div>
                            :
                            ""
                          }
                        
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                  
                
  )
}
