import React from "react";
import { useState } from "react";
import Registration from "./Registration";
function LoginMenu() {

  const [isRegistrationClicked, setIsRegistrationClicked] = useState(false);
  const [inputValues, setInputValues] = useState({});

  const inputFields = [
    {className: "userName", type: "text", label: "Username:", name:"userName"},
    {className: "email", type: "email", label: "Email", name: "email"},
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

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsRegistrationClicked(false);
  }

  function back(){
    setIsRegistrationClicked(false);
  }

  return (
    <div>
      {!isRegistrationClicked ? (
        <div>
        <section>
        <div>
          <label>Username:</label>
          <input type="text"></input>
      </div>
      <div>
        <label>Password:</label>
        <input type="password"></input>
      </div>
      </section>
      <div>
        <button className="Button">Log in</button>
        </div>
        <div>
        <button className="Button" onClick={handleClick}>Register</button>
      </div>
      </div>
      ) : (
        <div>
        <form onSubmit={handleSubmit}>
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
  );
}

export default LoginMenu;
