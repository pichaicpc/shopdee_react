import React, {useState} from "react";
import axios from "axios";

function Register(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post(process.env.REACT_APP_BASE_URL+'/register',
                {
                    username,
                    password,
                    firstName,
                    lastName
                }
            )
            const result = response.data;
            console.log(result);
            alert(result['message']);

            if(result['status'] === true){
                window.location.href = '/';
            }

        }catch(err){
            console.log(err)
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input type="text"
                placeholder="Username"
                value={username}
                onChange={ (e) => setUsername(e.target.value) }/> <br></br>
            <input type="password"
                placeholder="Password"
                value={password}
                onChange={ (e) => setPassword(e.target.value) }/> <br></br>
            <input type="text"
                placeholder="First name"            
                value={firstName}
                onChange={ (e) => setFirstName(e.target.value)}/> <br></br>
            <input type="text"
                placeholder="Last name"
                value={lastName}
                onChange={ (e) => setLastName(e.target.value)}/> <br></br>
            <button type="submit">Register</button>               
        </form>
    );
}

export default Register;