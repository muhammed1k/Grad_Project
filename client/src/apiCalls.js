import axios from "axios";
import { toastError, toastSuccess } from './Toastsuccess';

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("http://localhost:5000/api/auth/login", userCredential);
    console.log(userCredential)
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    toastSuccess("login successfully ")
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
    toastError("there is a problem with the email or password")
  }
};

