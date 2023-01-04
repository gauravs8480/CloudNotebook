import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'




const Signup = (props) => {
const [credentials,  setcredentials] = useState({name:"", email: "", password: "",cpassword:"" })
    let Navigate = useNavigate();
 
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name,email,password}=credentials;
        // API Call 
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name,email, password})
        });
        const json = await response.json()
        console.log(json)
        if (json.success) {
            //save the token and redirect 
            localStorage.setItem('token', json.authtoken);
            Navigate("/");
            // props.showAlert("account created successfully","success")

        }
        else {
            alert("Invalid credentials");
        }

        // props.showAlert("Invalid details","danger");
    }
    
    const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
}

  return (
    <div className="container mt-2">
<form onSubmit={handleSubmit}>
<h2> Sign up to use CloudNotebook</h2>
<div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control"       value={credentials.name}  id="name"  name='name' onChange={onChange} aria-describedby="emailHelp"/>
  
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control"       value={credentials.email}  id="email" name='email'  onChange={onChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" 
            value={credentials.password} id="password " name='password' minLength={5} required onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label"> Confirm Password</label>
    <input type="password" className="form-control" name='cpassword'  id="cpassword" minLength={5} required onChange={onChange}/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>

    </div>
  )
}

export default Signup