import { useEffect, useState } from "react";
import axios from "axios";
import  { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';

function Profile(props) {
  const [info,setInfo]= useState();
  useEffect(()=>{
    let mounted=true;
    axios.get("https://myplsapp.herokuapp.com/auth/profile", { headers: {"Authorization" : `Bearer ${props.token}`} }) 
      .then(response => {
        if (mounted) setInfo(response.data.data);
      })
    .catch(err => console.log(err));
    
    return ()=>{mounted=false;}
  },[props.token]);
  
  return (
    <div className="container py-3 px-5 bg-light h-100">
      <div className="d-flex">
        <h2 className="mr-auto">User Profile</h2>
        <Link to="/bookinglist">
          <button type="button" className="btn btn-lg mr-2 btn-info "><i className="fas fa-ticket-alt mr-2"></i>Booking List</button>
        </Link>
        <Link to="/editprofile">
          <button type="button" className="btn btn-lg mr-2 btn-warning "><i className="fas fa-edit mr-2"></i>Edit Profile</button>
        </Link>
        <Link to="/changepass">
          <button type="button" className="btn btn-lg btn-secondary ">Change Password</button>
        </Link>
      </div>
      <hr/>
      {!info?<Spinner />:(
        <div className="container">
          <div className="row">
            <div className="col-lg-2 col-md-3 col-sm-4">
              <h4>Username:</h4>
            </div>
            <div className="col-lg-10 col-md-9 col-sm-8">
              <h4 className="font-weight-normal">{info.username}</h4>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-lg-2 col-md-3 col-sm-4">
              <h4>Name:</h4>
            </div>
            <div className="col-lg-10 col-md-9 col-sm-8">
              <h4 className="font-weight-normal">{info.userDto.name}</h4>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-lg-2 col-md-3 col-sm-4">
              <h4>Age:</h4>
            </div>
            <div className="col-lg-10 col-md-9 col-sm-8">
              <h4 className="font-weight-normal">{info.userDto.age}</h4>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-lg-2 col-md-3 col-sm-4">
              <h4>Email:</h4>
            </div>
            <div className="col-lg-10 col-md-9 col-sm-8 s-3">
              <h4 className="font-weight-normal">{info.userDto.email}</h4>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-lg-2 col-md-3 col-sm-4">
              <h4>Address:</h4>
            </div>
            <div className="col-lg-10 col-md-9 col-sm-8">
              <h4 className="font-weight-normal">{info.userDto.address}</h4>
            </div>
          </div>  
        </div>     
      )
      }
    </div>        
  );
}

export default Profile;
