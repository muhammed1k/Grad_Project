import React ,{useState,useEffect,useContext} from "react";
import "./viewRide.css";
import axios from "axios";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { AuthContext } from "../../../context/AuthContext";
import RideCard from "./RideCard";



export default function ViewRides({socket})  {
  console.log(socket)
  const [rides,setRides] = useState([])
  const {state:search} = useLocation();
  const [loader, setLoader] = useState(true);
  const { user:currentuser  } = useContext(AuthContext);
useEffect(() => {
    axios.get("http://localhost:5000/api/rides/search_rides",{params:{...search}}).then(({data}) => {
      setRides(data);
      setLoader(false);
      console.log(data)
    })
   
},[])
useEffect(() => {},[rides])





  return (
    <section id="rideview">
      {
        loader? 
        <div className="d-flex h-100 justify-content-center align-items-center Spinner">
          <Spinner animation="grow" />
        </div>
        :
        (

          (rides.length==0 || loader )? 
          <span className="d-flex   justify-content-center align-items-center Spinner text-muted">
              there is no ride with the same input you entered !!
              <Link to="/FindRides" className="btn btn-muted">back to search box</Link>
          </span> 
              :
              rides.map((ride,id)=>{
                  return(
                    <RideCard ride={ride} key={id} socket={socket} />
                  )
            })
          
       )

      }
    </section>
  );
}
