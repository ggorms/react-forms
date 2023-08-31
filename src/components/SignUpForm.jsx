import { useState } from "react";



function SignUpForm({setToken}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

   async function handleSubmit(event) {
        event.preventDefault();
        if(username.length > 10 || password.length > 10){
            alert("Username and/or Password is too long. 10 Character Maximum")
        }else {
            try {
                const response = await fetch('https://fsa-jwt-practice.herokuapp.com/signup', 
                  { 
                    method: "POST", 
                    headers: { 
                      "Content-Type": "application/json" 
                    }, 
                    body: JSON.stringify({ 
                      username: username, 
                      password: password
                    }) 
                  })
                const result = await response.json();
                setToken(result.token)
            } catch (error) {
                setError(error.message);
            }
        }
       
   }

   

    return (
        <>
            <h2>Sign Up</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit} className="form">
                <label>
                    Username: <input value={username} onChange={(event) => {setUsername(event.target.value);}}/>
                </label>
                <label>
                    Password: <input value={password} onChange={(event) => {setPassword(event.target.value);}}/>
                </label>
                <button>Submit</button>
            </form>
        </>
        
    )
}

export default SignUpForm;