import {  toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
  
 export const toastSuccess = (msg) => toast.success(msg, {
    position: "top-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
 export const toastError = (msg) => toast.error(msg, {
    position: "top-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
 