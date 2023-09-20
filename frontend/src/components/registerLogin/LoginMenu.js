import React from "react";
import { useState } from "react";
import Registration from "./Registration";
import "./register.css"
function LoginMenu() {

  const [isRegistrationClicked, setIsRegistrationClicked] = useState(false);
  const [inputValues, setInputValues] = useState({});

  const inputFields = [
    {className: "userName", type: "text", label: "Username:", name:"userName"},
    {className: "email", type: "email", label: "Email:", name: "email"},
    {className: "password", type: "password", label: "Password:", name:"password"}
  ];

  function handleInputChange(event) {
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
    try {
      const response = await fetch('/Auth/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: inputValues.email,
          password: inputValues.password,
        }),
      });
  
      if (response.ok) {
        // Login was successful, handle accordingly
        const data = await response.json();
        console.log(data); // You can do something with the response data
      } else {
        // Login failed, handle accordingly
        console.error('Login failed');
      }
    } catch (error) {
      // Handle network errors
      console.error('Network error:', error);
    }
  };

  const handleRegistrationSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/Auth/Register', {
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
        // Registration was successful, handle accordingly
        const data = await response.json();
        console.log(data); // You can do something with the response data
      } else {
        // Registration failed, handle accordingly
        console.error('Registration failed');
      }
    } catch (error) {
      // Handle network errors
      console.error('Network error:', error);
    }
  };
  
// testEnd
  function back(){
    setIsRegistrationClicked(false);
  }

  return (<div>
    <div className="welcome-message">
      Welcome! Please {isRegistrationClicked ? 'Register' : 'Login'}
    </div>
    <div className="register-container">
      {!isRegistrationClicked ? (
        <div>
        <section>
        <div className="register-input">
          <label>Username:</label>
          <input type="text"></input>
      </div>
      <div className="register-input" id="passwordInput">
        <label>Password:</label>
        <input type="password"></input>
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
            onChange={handleInputChange}/>
          ))}
          <button className="Button" type="submit">Submit</button>
          
        </form>
        <div>
          <button className="Button" onClick={back}>Back</button>
        </div>
        </div>
      )}
    </div>
    </div>
  );
}

export default LoginMenu;
