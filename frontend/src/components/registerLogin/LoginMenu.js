import React from "react";
import { useState } from "react";
import Registration from "./Registration";
import "./register.css"
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
function LoginMenu() {

  const [isRegistrationClicked, setIsRegistrationClicked] = useState(false);
  const [inputValues, setInputValues] = useState({});
  const [saveEmail, setSaveEmail] = useState("");
  const [savePassword, setSavePassword] = useState("");
  const navigate = useNavigate();
  const token = Cookies.get("userToken");
  const [userNameWarning, setUserNameWarning] = useState("");
  const [emailWarning, setEmailWarning] = useState("");
  const [passwordWarning, setPassowrdWarning] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

 
  

  const inputFields = [
    {className: "userName", type: "text", label: "Username:", name:"userName"},
    {className: "email", type: "email", label: "Email:", name: "email"},
    {className: "password", type: "password", label: "Password:", name:"password"}
  ];

  const warnings = [userNameWarning, emailWarning, passwordWarning];

  function handleInputChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    setInputValues({...inputValues, [name]: value});
  }

  function handleClick(){
    setIsRegistrationClicked(true);
    setInputValues({});
  }

  // test
  const handleSubmit = async (event) => {
    event.preventDefault();
    setEmailWarning("");
    setPassowrdWarning("");
    try {
      await fetch('https://localhost:7173/Auth/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: saveEmail,
          password: savePassword,
        }),
      })
      .then((res) => res.json())
      .then((data) => {
        console.log("Login response:", data);
        if(data && data.email && data.userName && data.token){
          Cookies.set("userEmail", data.email, { expires: 10 });
          Cookies.set("userUserName", data.userName, { expires: 10 });
          Cookies.set("userToken", data.token, { expires: 10 });
          
          const tokenPayload = JSON.parse(atob(data.token.split('.')[1]));
          const userRole = tokenPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
          Cookies.set("userRole", userRole, { expires: 10 });

          if(userRole === "Admin"){
            navigate("/ManageUsers");
          } else {
           navigate("/MyTools");
          }
        }
        else{
          // console.log("Else ag:", data["Bad credentials"][0]);
          if(data["Bad credentials"][0] === "Invalid email"){
            setEmailWarning(data["Bad credentials"][0])
          }
          if(data["Bad credentials"][0] === "Invalid password"){
            setPassowrdWarning(data["Bad credentials"][0])
          }
        }
      })
    } catch(err){
      console.error(err);
    }
  };

  const handleRegistrationSubmit = async (event) => {
    event.preventDefault();
    setUserNameWarning("");
    setEmailWarning("");
    setPassowrdWarning("");
    try {
      const response = await fetch('https://localhost:7173/Auth/Register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: inputValues.email,
          username: inputValues.userName,
          password: inputValues.password,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data); 
        setIsRegistrationClicked(false);
        setRegistrationSuccess(true);
        setTimeout(() => {
          setRegistrationSuccess(false);
        }, 5000);
      } else {
        const data = await response.json();
        console.log(data);
        if(data.DuplicateUserName && data.DuplicateUserName){
          setUserNameWarning("Username is already taken");
        }
        if(inputValues.userName === undefined || inputValues.userName === ""){
          setUserNameWarning("Please enter a username");
        }
        if((data.DuplicateEmail && data.DuplicateEmail) || inputValues.email === undefined){
          setEmailWarning("Email is already taken");
        }
        if(inputValues.email === undefined){
          setEmailWarning("Please anter an email address");
        }
        
        if(inputValues.password === undefined || inputValues.password.length < 6){
          setPassowrdWarning("Password must be at least 6 characters");
        }
      }
    } catch (error) {
      
      console.error('Network error:', error);
    }
  };
  

  function back(){
    setIsRegistrationClicked(false);
  }

  return (<div>
    <div className="welcome-message">
      Welcome! Please {isRegistrationClicked ? 'Register' : 'Login'}
    </div>
    <p className="register-message">{registrationSuccess ? ("Successful registration! Log in.") : (null)}</p>
    <div className="register-container">
      {!isRegistrationClicked ? (
        <div>
        <section>
        <div className="register-input">
          <label>Email:</label>
          <input type="text" onChange={(e) => setSaveEmail(e.target.value)}></input>
          <div className="warning">{emailWarning}</div>
      </div>
      <div className="register-input" id="passwordInput">
        <label>Password:</label>  
        <input type="password" onChange={(e) => setSavePassword(e.target.value)}></input>
        <div className="warning">{passwordWarning}</div>
      </div>
      </section>
      <div>
        <button className="Button" onClick={handleSubmit}>Log in</button>
        </div>
        <div>
        <button className="Button" onClick={handleClick}>Register</button>
      </div>
      </div>
      ) : (
        <div className="register-input label">
        <form onSubmit={handleRegistrationSubmit}>
          {inputFields.map((inputField, index) =>(
            <Registration
            key={index}
            className={inputField.className}
            type={inputField.type}
            label={inputField.label}
            name={inputField.name}
            value={inputValues[inputField.name] || ""}
            warnings={warnings[index]}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            onChange={handleInputChange}/>
            
          ))}
          <button className="Button" type="submit">Submit</button>
          
        </form>
        <div>
          <button className="Button" onClick={back}>Already have an account? Sign in</button>
        </div>
        </div>
      )}
    </div>
    </div>
  );
}

export default LoginMenu;
