import React, { useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { toastError, toastSuccess } from '../../../Toastsuccess';
import { useHistory } from 'react-router-dom';
import FormData from 'form-data';

export default function ProfileSettings() {

  
  const [formData, setFormData] = useState('');
  const { user: currentuser,dispatch} = useContext(AuthContext);
	const [user,setUser] = useState(currentuser);

	
	const handelInput = (e) => {
		setUser({
		  ...user,
		  [e.target.name]: e.target.value,
		});
	  };
	  const history = useHistory();
	 const handelCancel =()=>{
		history.push(`/profile/${user._id}`);
	 }

   //submit
	 const handelSubmit =(event)=>{
    event.preventDefault()
    const form = new formData();
    console.log(user)
		axios.post('http://localhost:5000/api/auth/edit_profile',user).then((res) => {
      if(res.status === '200'){
        toastSuccess("Changes submited")
        
      }

      else
      toastError("an error happend while updating your data")

    }).catch((err)=>{
        toastError(err)
    })
	 }
   const [info, setInfo] = useState({
     image: '',
     name: '',
   });
   const [file, setFile] = useState(null);
   const [progressPercent, setProgressPercent] = useState(0);
   const [error, setError] = useState({
     found: false,
     message: '',
   });
   /** end states */
 
 
   // Submit Form
   const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      ...user
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.profileimg = fileName;
      console.log(newPost);
      try {
        await axios.post("http://localhost:5000/api/upload", data);
      } catch (err) {}
    }
	try {
		await axios.post("http://localhost:5000/api/auth/edit_profile", newPost);
	  } catch (err) {}

    dispatch({ type: "LOGIN_SUCCESS", payload: newPost });
  };
  //submit all form 
  //dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  return (
      <div className="container">
        <div className="row">
		<div className="col-12">
			{/* <!-- Page title --> */}
			<div className="my-5">
				<h3>Edit Profile</h3>
				<hr/>
			</div>
			{/* <!-- START Form  --> */}
			<form onSubmit={handleSubmit} className="file-upload">
				<div className="row mb-5 gx-5">
					{/* <!-- Contact detail --> */}
					<div className="col-xxl-8 mb-5 mb-xxl-0">
						<div className="bg-white px-4 py-5 rounded">
							<div className="row g-3">
								<h4 className="mb-4 mt-0">Contact detail</h4>
								{/* <!-- First Name --> */}
								<div className="col-md-6">
									<label className="form-label">Full Name </label>
									<input name="fullname" type="text" className="form-control" placeholder="" aria-label="First name" value={user.fullname}  onChange={handelInput}  />
								</div>
								{/* <!-- Phone number --> */}
								<div className="col-md-6">
									<label className="form-label"><i className="fa-light fa-mobile-screen-button"></i>  Phone number </label>
									<input name="phone" type="mobile" className="form-control" placeholder="" aria-label="Phone number" value={user.phone} onChange={handelInput} />
								</div>
								{/* <!-- Email --> */}
								<div className="col-md-6">
									<label htmlFor="inputEmail4" className="form-label">Email *</label>
									<input name="email" type="email" className="form-control" placeholder="" aria-label="email" value={user.email} onChange={handelInput} />
								</div>
								{/* <!-- Facebook --> */}
								<div className="col-md-6">
									<label className="form-label"><i className="fab fa-fw fa-facebook me-2 text-facebook"></i> Facebook </label>
									<input type="text" name="facebook" className="form-control" placeholder="" aria-label="Facebook" value={user.facebook} onChange={handelInput} />
								</div>
								{/* <!-- date of birthe --> */}
								<div className="col-md-6">
									<label className="form-label"><i className="fa-light fa-calendar-days"></i> birth date </label>
									<input type="date" name="birth_date" className="form-control" placeholder="" aria-label="birth_date" value={user.facebook} onChange={handelInput} />
								</div>
								{/* <!-- user.address --> */}
								<div className="col-md-6">
									<label className="form-label"><i className="fa-solid fa-building"></i>  address</label>
									<input type="text" name="address" className="form-control" placeholder="" aria-label="address" value={user.address} onChange={handelInput} />
								</div>
							{/* </div> <!-- Row END --> */}
						</div>
					</div>
					{/* <!-- Upload profile --> */}
					<div className="row">
		<div
      style={{ width: '100vw', height: '100vh' }}
      className='d-flex justify-content-center align-items-center flex-column'
    >
      {error.found && (
        <div
          className='alert alert-danger'
          role='alert'
          style={{ width: '359px' }}
        >
          {error.message}
        </div>
      )}

      
        <div className='progress mb-3 w-100'>
          <div
            className='progress-bar'
            role='progressbar'
            style={{ width: `${progressPercent}%` }}
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            {progressPercent}
          </div>
        </div>
        <div className='custom-file mb-3'>
          <input
            type='file'
            className='custom-file-input'
            id='file'
            aria-describedby='inputGroupFileAddon04'
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className='custom-file-label' htmlFor='inputGroupFile04'>
            Choose file
          </label>
        </div>
        <button type='submit' className='btn btn-primary w-100'>
          Submit
        </button>
      <img
        className='mt-3'
        src={`http://localhost:5000/${info.image}`}
        alt={`${info.name}`}
        style={{ width: '359px' }}
      />
    </div>
</div>
		</div>
				{/* <!-- CAR detail --> */}
				<div className="row mb-5 gx-5">
					<div className="col-xxl-6 mb-5 mb-xxl-0">
						<div className="bg-white px-4 py-5 rounded">
							<div className="row g-3">
								<h4 className="mb-4 mt-0">Car detail</h4>
								{/* <!-- Brand --> */}
								<div className="col-md-6">
									<label className="form-label"><i className="fa-solid fa-car"></i> Brand *</label>
									<input type="text" name="brand" className="form-control" placeholder="" aria-label="Facebook" value={user.brand} onChange={handelInput} />
								</div>
								{/* <!-- Model --> */}
								<div className="col-md-6">
									<label className="form-label"><i className="fa-solid fa-gas-pump"></i> Model *</label>
									<input type="text" name="model" className="form-control" placeholder="" aria-label="Twitter" value={user.model} onChange={handelInput} />
								</div>
								
								{/* <!-- Color --> */}
								<div className="col-md-6">
									<label className="form-label"><i className="fa-light fa-car"></i> Color *</label>
									<input type="color" name='color' className="form-control" placeholder="" aria-label="Instragram" value={user.color} onChange={handelInput} />
								
							</div>
						</div>
					</div>

				
				</div> 
				{/* <!-- button --> */}
				<div className="gap-3 d-md-flex justify-content-md-end text-center">
					<button type="submit" className="btn btn-danger btn-lg" onClick={handelCancel} >cancel Edit</button>
					<button type="button" className="btn btn-primary btn-lg" onClick={handleSubmit}>Update profile</button>
				</div>
		</div>
		</div>
			</form> 
	</div>
	</div>
    </div>

  )
}
