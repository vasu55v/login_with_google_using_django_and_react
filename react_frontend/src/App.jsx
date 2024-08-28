import { useState } from 'react'
import './App.css'
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';

function App() {
   const [user,setUser]=useState(null);

   const responseGoogle=(credentialResponse)=>{
    console.log(credentialResponse)
    axios.post('http://localhost:8000/app_api/google/', {
      access_token: credentialResponse.credential  // Changed from response.accessToken
    })
    .then((res)=>{
      localStorage.setItem('token',res.data.key);
      fetchUserDetails();
    })
    .catch(err => console.log(err));

   }

   const fetchUserDetails = () => {
    axios.get('http://localhost:8000/app_api/user/', {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
    .then(res => {
      setUser(res.data);
    })
    .catch(err => console.log(err));
  }

  return (
    <>
  <GoogleOAuthProvider clientId="1024231533476-0295mbkr490ogv7m07he4ndm4eflka5m.apps.googleusercontent.com">

    <div className='container'>
      <h1>Google login example.</h1>
      {!user ?(
        <GoogleLogin
        onSuccess={responseGoogle}
        onError={() => {
          console.log('Login Failed');
        }}
        // cookiePolicy={'single_host_origin'}
        />

      ):(
        <div>
          <h2>Welcome, {user.username}!</h2>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
    </GoogleOAuthProvider>

    </>
  )
}

export default App
