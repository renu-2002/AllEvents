/*LoginApp.js*/

import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';



function LoginPage() {
    const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState([]);
    const [name, setName]= useState("");
    const [email, setEmail]= useState("");

    const [data, setData] = useState([]);

    
    useEffect(() => {
        fetch('http://localhost:8081/user')
          .then(res => res.json())
          .then(data => {
            console.log(data);
            setData(data);
          })
          .catch(err => console.log("user table error: " + err));
    }, []);

    
    const login = useGoogleLogin({

        onSuccess: async (codeResponse) => {
            setUser(codeResponse);
            setEmail(profile.email);
            setName(profile.name);
            const userData= {
                email,
                name
            }
        
            try {
                const response = await axios.post("http://localhost:8081/user", userData);
                console.log(response.data);
            } catch (error) {
                console.log("user table error:" + error);
            }
        },
            
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (user && user.access_token) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ user?.access_token ]
    );

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        setProfile(null);
    };

    return (
        <>
        
            <div>
                <h2>Login Page</h2>
               
                {profile ? (
                    
                    <div class="card">
                        <div class="card-header"><img src={profile.picture} alt="user image" /></div>
                        <div class="card-body">
                            <h3>User Logged in</h3>
                            <p>Name: {profile.name}</p>
                            <p>Email Address: {profile.email}</p>
                            <button onClick={logOut} type="button" class="btn btn-secondary">Log out</button>
                        </div>
                        <div class="card-footer">
                            <button type="button" class="btn btn-success">
                                <a class="nav-link" href='/homepage'>Home</a>
                            </button>
                            <button type="button" class="btn btn-success">
                                <a class="nav-link" href='/allevents'>See all Events</a>
                            </button>
                        </div>
                    </div>
                ) : (
                    <button onClick={() => login()} type="button" class="btn btn-primary">SignIn with Google</button>

                )}
            </div>
        </>
    );
}
export default LoginPage;