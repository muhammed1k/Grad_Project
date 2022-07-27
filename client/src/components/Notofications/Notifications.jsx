import React, { useState, useEffect, useContext } from "react";
import "./notification.css";
import { Link,useHistory } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";

export default function Notifications({ socket }) {
  const pf = process.env.REACT_APP_PUBLIC_FOLDER;
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const history = useHistory()


  useEffect(() => {
    console.log(notifications.length)
    socket.on("getNotification", (data) => {
      setNotifications((prev) => [...prev, data]);
      console.log(data)
      setOpen(data)
    });

  }, [socket]);


  const displayNotification = ({type,senderName}) => {
    let action;
    if (type === 1) {
      action = "Requested to join";
    } else if (type === 2) {
      action = "Accepted ur Request";
    } else {
      action = "Rejected ur Request";
    }
    const handelAccept = () => {
      const receiver = senderName
      
      socket.emit("sendNotification", {
        senderName: user.fullname,
        receiverName: receiver,
        userid:user._id,
        type: 2,
      });
      
    }
    const handelRefuse = () => {
      const receiver = senderName
      
      socket.emit("sendNotification", {
        senderName: user.fullname,
        receiverName: receiver,
        userid:user._id,
        type: 3,
      });
    }

    // const userGo = () => {
    //   history.push(`/profile/${open.userid}`)
    //   console.log(`http://localhost:3000:/profile/${open.userid}`)
    // }

    return (
      <tr className="border-bottom" >
        <td>
          <div className="p-2">
            <span className="d-block font-weight-bold"></span>
          </div>
        </td>
        <td>
          <div className="p-2 d-flex flex-row align-items-center mb-2 mr-3">

            <div className="d-flex flex-column ml-4">
              <Link  to={`/profile/${open.userid}`} style={{ textDecoration: "none" }}>
                <span className="d-block font-weight-bold">
                  {senderName}
                </span>
              </Link>
              <small className="text-muted">

              </small>
            </div>
          </div>
        </td>
        <td>
          <div className="p-4">
            {action}
          </div>
        </td>
        <td>
          <div className="p-2 d-flex ">
            {
              type === 1 &&
              <>
                <span>
                  <input type="button" onClick={handelAccept} value="Accept" className="btn btn-primary mx-3" />
                </span>
                <span>
                  <input type="button" onClick={handelRefuse} value="Refuse" className="btn btn-danger mx-3" />
                </span>
              </>

            }
          </div>
        </td>
      </tr>

    );
  };

  const handleRead = () => {
    setNotifications([]);
    setOpen(false);
  };




  return (
    <div id="notification">
      {
        notifications.length == 0 ? (
          <span className="text-info">You don't have any notifications yet</span>
        ) : (
          <>
            <div className="container">
              <table className="table table-borderless table-responsive card-1 p-4 mb-4">
                <thead>
                  <tr className="border-bottom">
                    <th>
                      <span className="ml-2">Time</span>
                    </th>
                    <th>
                      <span className="ml-2">Agent</span>
                    </th>
                    <th>
                      <span className="mx-4">descrption</span>
                    </th>
                    <th>
                      <span className="ml-4">Action</span>
                    </th>
                  </tr>
                </thead>
                <tbody>

                  {notifications.map((n) => displayNotification(n))}


                </tbody>
              </table>
            </div>

          </>


        )}
    </div>
  );
}


